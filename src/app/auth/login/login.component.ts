import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  message: {text: string, type: string} = {text: '', type: 'danger'};

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.showError('Чтобы начать работу войдите в систему.', 'warning');
      } else if (params['nowCanLogin']) {
        this.showError('Теперь вы можете войти в систему со своими данными', 'success');
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  private showError(text: string, type: string = 'danger') {
    this.message = {text, type};
    window.setTimeout(() => {this.message.text = ''}, 5000);
  }

  onSubmit() {
    const userData = this.form.value;

    this.userService.getUserByEmail(userData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === userData.password) {
            this.message.text = '';
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
