import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpService } from '../core/services/http.service';
import { LanguageService } from '@shared/services/language.service';
import { NotificationService } from '@services/notification.service';
import { endpoints } from '@configs/endpoints';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpService,
    private _notifications: NotificationService,
    private language: LanguageService) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.http.post(endpoints.authRegister(), {
        'email': this.registerForm.get('email').value,
        'username': this.registerForm.get('username').value,
        'password': this.registerForm.get('password').value
      })
      .subscribe(
        data => {
          const key = `REGISTER.${data['alert']}`;
          this.language.translate(key).subscribe((value: string) => {
            if (data['reset']) {
              this._notifications.open('Status', value, 'success');
              this.registerForm.reset();
              return true;
            }
            this._notifications.open('Status', value, 'error');
          });
        },
        error => {
          console.log('Error', error);
        }
      );
    }
  }

  private initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
