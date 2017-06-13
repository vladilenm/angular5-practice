import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: Http) {}

  getUserCreds() {
    return this.http.get('http://localhost:3000/user')
      .map((response: Response) => response.json());
    // this.isAuthenticated = true;
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
