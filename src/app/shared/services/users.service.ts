import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api.service';

@Injectable()
export class UserService extends BaseApi {

  private users = [
    new User('wfm@mail.ru', '12345678', 'Администратор', 1)
  ];

  private idCount = 1;

  constructor(public http: Http) {
    super(http);
  }

  getUsers(): Observable<User[]> {
    return Observable.of(this.users.slice());
  }

  getUserByEmail(email: string): Observable<User> {
    return Observable.of(this.users.find(u => u.email === email));
  }

  createNewUser(user: User): Observable<User> {
    user.id = ++this.idCount;
    this.users.push(user);
    return Observable.of(user);
  }

}
