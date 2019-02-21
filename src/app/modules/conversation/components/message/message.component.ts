import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  @Input()
  date: string;
  @Input()
  username: string;
  @Input()
  message: string;
  backgroundColor: string;

  ngOnInit(): void {
    this.backgroundColor = (this.username === localStorage.getItem('username')) ?  'rgb(237,44,85)' : 'rgb(0,152,151)';
  }
}
