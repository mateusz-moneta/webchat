import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  HostListener,
  ElementRef
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HttpService } from '../core/services/http.service';
import { MessageComponent } from './components/message/message.component';
import { datetime, datetimeSQL } from '@shared/utils/datetime';
import { DateTimePipe } from '@shared/pipes/datetime.pipe';
import { SocketService } from '@services/socket.service';
import { ScrollService } from '@services/scroll.service';
import { Message } from '@shared/interfaces/message.interface';
import { endpoints } from '@configs/endpoints';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('messagesContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  messageText = '';

  private complete = false;
  private conversationID: number;
  private end: number;
  private factory: any;
  private messageComponentRef: any;
  private messages: Message[];
  private messageComponents = [];
  private messagesHeight = 0;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private start: number;
  private toolbarHeight: number;
  private transitionStep = 10;

  constructor(
    private elementRef: ElementRef,
    private http: HttpService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private socket: SocketService,
    private scroll: ScrollService) {
  }

  goToDashboard(): void {
    this.router.navigate(['./dashboard']).catch(console.error);
  }

  ngAfterViewInit(): void {
    const toolbar = this.elementRef.nativeElement.querySelector('.mat-toolbar');
    this.toolbarHeight = toolbar.offsetHeight;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.socket.leave({ 'conversation_id': this.conversationID });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conversationID = params['id'];
    });

    this.http.post(endpoints.loadLastMessages(), { 'username': localStorage.getItem('username'), 'conversation_id': this.conversationID })
      .subscribe(
        data => {
          if (!data) {
            return this.location.back();
          }
          this.messages = JSON.parse(data['messages']);
          this.start = (this.messages.length - this.transitionStep > 0) ? this.messages.length - this.transitionStep : 0;
          this.end = this.messages.length;
          this.render(this.start, this.end);
          this.scroll.toPosY(this.scroll.height);
        },
        error => {
          console.log('Error', error);
        }
      );

    this.factory = this.resolver.resolveComponentFactory(MessageComponent);

    this.socket.join({ 'conversation_id': this.conversationID });

    this.socket.getMessages().pipe(takeUntil(this.ngUnsubscribe)).subscribe(message => {
      this.receivingMessage(message);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset < this.toolbarHeight && !this.complete) {
      this.start -= this.transitionStep;
      this.end -= this.transitionStep;
      this.render(this.start, this.end, true);
      this.scroll.posY(this.messagesHeight + this.toolbarHeight);
      this.messagesHeight = 0;
    }
  }

  sendMessage(): void {
    if (this.messageText.length > 0) {
      this.socket.sendMessage({ 'username': localStorage.getItem('username'), 'conversation_id': this.conversationID, 'message': this.messageText, 'datetime': datetime() });

      this.http.post(endpoints.message(), { 'conversation_id': this.conversationID, 'username': localStorage.getItem('username'), 'message': this.messageText, 'datetime': datetimeSQL() })
        .subscribe(() => {
            this.createMessage(localStorage.getItem('username'), this.messageText, datetime());
            this.messageText = '';
          },
          error => {
            console.log('Error', error);
          }
        );
    }
  }

  private createMessage(username: string, message: string, date: string, move = false): void {
    this.messageComponentRef = this.entry.createComponent(this.factory);
    this.messageComponents.push(this.messageComponentRef);
    this.messageComponentRef.instance.username = username;
    this.messageComponentRef.instance.message = message;
    this.messageComponentRef.instance.date = date;
    if (move) {
      this.entry.move(this.messageComponentRef.hostView, 0);
    }
  }

  private receivingMessage(data): void {
    const parsedData = JSON.parse(data);
    this.createMessage(parsedData['username'], parsedData['message'], parsedData['datetime']);
  }

  private rechargeMessages(messageID: number) {
    return new Promise((resolve, reject) => {
      this.http.post(endpoints.rechargeMessages(), { 'conversation_id': this.conversationID, 'message_id': messageID })
        .subscribe(data => {
            try {
              const messages = JSON.parse(data['messages']);
              this.messages = [...messages, ...this.messages];
              this.start += messages.length - this.transitionStep;
              this.end += messages.length;
            } catch (e) {
              console.error(e);
            }
          },
          error => {
            reject(error);
          }
        );
    });
  }

  private render(start: number, end: number, move = false): void {
    if (!start) {
      this.complete = true;
    } else if (start < 10 && move) {
      const [{ messageID }] = this.messages;
      this.rechargeMessages(messageID).catch(console.error);
    }

    let messages = this.messages.slice(start, end);
    if (move) {
      messages = messages.reverse();
    }

    messages.forEach((message: Message) => {
      const date = new DateTimePipe().transform(message.date);
      this.createMessage(message.username, message.message, date, move);

      if (move) {
        const messageContainer = this.elementRef.nativeElement.querySelector('.message-container');
        this.messagesHeight += messageContainer.offsetHeight;
      }
    });
  }
}
