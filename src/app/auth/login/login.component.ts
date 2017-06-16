import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/users.service';
import { routingFadeTrigger } from '../../shared/animations/routing.animations';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routingFadeTrigger]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  authError: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.showError('Чтобы начать работу войдите в систему.');
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  private showError(message: string) {
    this.authError = message;
    window.setTimeout(() => {this.authError = ''}, 5000);
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
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showError('Неверный пароль!');
          }
        } else {
          this.showError('Такого пользователя нет!');
        }
      });
  }

}
