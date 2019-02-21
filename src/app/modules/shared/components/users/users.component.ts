import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { HttpService } from '../../../core/services/http.service';
import { NotificationService } from '@services/notification.service';
import { LanguageService } from '@shared/services/language.service';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @Output()
  close = new EventEmitter();
  currentPage = 0;
  list: User[] = [];
  length: number;
  pageSize = 5;

  constructor(
    private http: HttpService,
    private router: Router,
    private _notifications: NotificationService,
    private language: LanguageService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  createConversation(username: string) {
    const users = [localStorage.getItem('username'), username];

    this.http.post('/conversation/init', { 'users': JSON.stringify(users) }).subscribe(
      data => {
        this.router.navigate([`./conversation/${data['redirect']}`]);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  handlePaginator(event: { pageIndex: number; pageSize: number; }): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  onClose(): void {
    this.close.emit();
  }

  private getUsers(): void {
    this.http.post('/users/list', { 'username': localStorage.getItem('username') }).subscribe(
      data => {
        try {
          const parsedData = JSON.parse(data['list']);
          this.list = parsedData.slice(this.currentPage * this.pageSize, this.currentPage * this.pageSize + this.pageSize);
          this.length = parsedData.length;
        } catch (e) {
          const key = `USERS.${data['list']}`;
          this.language.translate(key).subscribe((value: string) => {
            this._notifications.open('Status', value, 'info');
          });
        }
      },
      error => {
        console.log('Error', error);
      }
    );
  }
}
