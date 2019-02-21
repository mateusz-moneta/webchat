import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { HttpService } from '@services/http.service';
import { DialogService } from '@services/dialog.service';
import { UsersComponent } from '../shared/components/users/users.component';
import { SettingsComponent } from '../shared/components/settings/settings.component';
import { Conversation } from '@interfaces/conversation.interface';
import { endpoints } from '@configs/endpoints';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  currentPage = 0;
  conversations: Conversation[];
  length: number;
  pageSize = 10;

  constructor(
    private auth: AuthService,
    private dialog: DialogService,
    private router: Router,
    private http: HttpService) { }

  ngOnDestroy(): void {
    this.dialog.close();
  }

  ngOnInit(): void {
    this.reworkConversations().catch(console.error);
  }

  handlePaginator(event: { pageIndex: number; pageSize: number; }) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.reworkConversations().catch(console.error);
  }

  createConversation(): void {
    this.dialog.open(UsersComponent, '80%', '80%');
  }

  joinToConversation(id: number): void {
    this.router.navigate([`./conversation/${id}`]).catch(console.error);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['./login']).catch(console.error);
  }

  settings(): void {
    this.dialog.open(SettingsComponent, '80%', '60%');
  }

  private getConversations() {
    return new Promise((resolve, reject) => {
      this.http.post(endpoints.loadListOfConversations(), {'username': localStorage.getItem('username') })
        .subscribe(data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  private async reworkConversations() {
    const data = await this.getConversations();
    this.conversations = Object.values(data).slice(this.currentPage * this.pageSize, this.currentPage * this.pageSize + this.pageSize);
    this.length = Object.values(data).length;
  }
}
