import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/users.service';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  authError: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    const userData = this.form.value;

    this.userService.getUserByEmail(userData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === userData.password) {
            this.authError = '';
            this.authService.login();
            window.localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/bill']);
          } else {
            this.authError = 'Неверный пароль!';
          }
        } else {
          this.authError = 'Такого пользователя нет!';
        }
      });
  }

}
