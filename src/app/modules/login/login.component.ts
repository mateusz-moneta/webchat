import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '@services/notification.service';
import { AuthService } from '@services/auth.service';
import { LanguageService } from '@shared/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  error: string;
  loginForm: FormGroup;

  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private _notifications: NotificationService,
    private language: LanguageService,
    private router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(
        result => {
          if (result === true) {
            return this.router.navigate(['./dashboard']);
          }
          const key = `LOGIN.${result}`;
          this.language.translate(key).subscribe((value: string) => {
            this._notifications.open('Status', value, 'error');
          });
        },
        err => this.error = 'Could not authenticate'
      );
    }
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
}
