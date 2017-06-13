import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: Http) {}

  getUserCreds(): Observable<any> {
    return this.http.get('http://localhost:3000/user')
      .map((response: Response) => response.json());
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
