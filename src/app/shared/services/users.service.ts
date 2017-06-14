import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getUsers(): Observable<User[]> {
    return this.http.get('http://localhost:3000/users')
      .map((response: Response) => response.json());
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .map((response: Response) => response.json())
      .map((user: User[]) => user[0] ? user[0] : undefined);
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post('http://localhost:3000/users', user)
      .map((response: Response) => response.json());
  }

}
