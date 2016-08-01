import { Injectable, EventEmitter, Output } from '@angular/core';
import { Headers, Http, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';

import { LoginForm } from '../models/login-form';
import { User } from '../models/user';

import { Locker } from 'angular2-locker';

@Injectable()
export class SessionsService {
  private url = "http://localhost:3000/auth/";

  private loggedIn: boolean = false;
  private currentUser: User = null;
  private lockerKey: string = 'currentUser';

  @Output() private statusEmitter = new EventEmitter();

  constructor(
    private http: Http,
    private locker: Locker
  ) {
    if (this.locker.has(this.lockerKey)) {
      this.currentUser = this.locker.get('currentUser');
    }
  }

  login(form: LoginForm) {
    let body = JSON.stringify(form);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // console.log("form", body)
    return this.http.post(`${this.url}sign_in`, body, options)
      .subscribe(
      (success: Response) => {
        let headers = success.headers;
        this.currentUser = success.json().data;
        this.currentUser.authHeaders = new Headers({
          'Content-Type': 'application/json',
          'access-token': headers.get('access-token'),
          'client': headers.get('client'),
          'uid': headers.get('uid'),
          'expiry': headers.get('expiry')
        });
        this.loggedIn = true;
        this.locker.set(this.lockerKey, this.currentUser);
        this.emitAuthStatus(null);
        console.log("user", this.currentUser);
      },
      (fail: Response) => {
        console.log('login failed', fail);
        this.currentUser = null;
        this.locker.remove(this.lockerKey);
        this.loggedIn = false;
      });
  }

  isLoggedIn() {
    if (this.locker.has(this.lockerKey)) {
      this.currentUser = this.locker.get(this.lockerKey);
      this.validateToken();
    } else {
      this.currentUser = null;
      this.loggedIn = false;
      this.emitAuthStatus(null);
    }
  }

  validateToken() {
    if (this.currentUser !== null) {
      let headers = this.currentUser.authHeaders;
      let options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.url}validate_token`, options).subscribe(
        (success: Response) => {
          // console.log("token valid");
          this.loggedIn = true;
          this.emitAuthStatus(null);
        },
        (fail: Response) => {
          this.loggedIn = false;
          this.currentUser = null;
          this.locker.remove(this.lockerKey);
          console.log("could not validate token", fail);
          this.emitAuthStatus(null);
        });
    } else {
      this.emitAuthStatus(null);
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    if (this.currentUser !== null) {
      let headers = this.currentUser.authHeaders;
      let options = new RequestOptions({ headers: headers });
      this.http.delete(`${this.url}sign_out`, options).subscribe(
        (res: Response) => {
          console.log("logout successful");
          this.currentUser = null;
          this.loggedIn = false;
          this.locker.remove(this.lockerKey);
          this.emitAuthStatus(null);
        },
        (error: Response) => {
          this.currentUser = null;
          this.loggedIn = false;
          this.locker.remove(this.lockerKey);
          this.emitAuthStatus(null);
        }
      )
    } else {
      this.emitAuthStatus(null);
    }
  }

  emitAuthStatus(data: any) {
    let obj = {
      loggedIn: this.loggedIn,
      currentUser: this.currentUser,
      data: data
    };
    this.statusEmitter.emit(obj);
    // console.log("emit", obj);
  }

  public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
    return this.statusEmitter.subscribe(onNext, onThrow, onReturn);
  }
}
