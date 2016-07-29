import { Injectable, EventEmitter, Output } from '@angular/core';
import { Headers, Http, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';

import { LoginForm } from '../models/login-form';
import { User } from '../models/user';

@Injectable()
export class SessionsService {
  private url = "http://localhost:3000/auth/";

  private loggedIn: boolean = false;
  private currentUser: User = null;

  @Output() private statusEmitter = new EventEmitter();

  constructor(
    private http: Http
  ) { }

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
        this.currentUser.accessToken = headers.get('access-token');
        this.currentUser.client = headers.get('client');
        this.currentUser.expiry = headers.get('expiry');
        this.loggedIn = true;
        this.emitAuthStatus(null);
        console.log("user", this.currentUser);
      },
      (fail: Response) => {
        console.log('login failed', fail);
        this.currentUser = null;
        this.loggedIn = false;
      });
  }

  // login2(form: LoginForm) {
  //   this.authService.signIn(form)
  //     .subscribe(
  //     (res) => {
  //       this.loggedIn = true;
  //       this.currentUser = res.json().data;
  //       // console.log(this.currentUser);
  //       // console.log(res);
  //       this.emitAuthStatus(null);
  //     },
  //     (error) => {
  //       console.log("login failed", error);
  //       this.loggedIn = false;
  //       this.currentUser = null;
  //       this.emitAuthStatus(null);
  //     });
  // }

  isLoggedIn() {
    this.validateToken();
  }

  validateToken() {
    if (this.currentUser !== null) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'access-token': this.currentUser.accessToken,
        'client': this.currentUser.client,
        'uid': this.currentUser.uid
      });
      let options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.url}validate_token`, options).subscribe(
        (success: Response) => {
          console.log("token valid");
          this.loggedIn = true;
          this.emitAuthStatus(null);
        },
        (fail: Response) => {
          this.loggedIn = false;
          this.currentUser = null;
          console.log("could not validate token", fail);
          this.emitAuthStatus(null);
        });
    } else {
      this.emitAuthStatus(null);
    }
  }
  // validateToken() {
  //   // this.authHttp.get('http://localhost:3000/heros')
  //   this.authService.validateToken()
  //     .subscribe(
  //     (success) => {
  //       console.log(success);
  //       this.loggedIn = true;
  //       this.emitAuthStatus(null);
  //     },
  //     (fail) => {
  //       this.loggedIn = false;
  //       this.currentUser = null;
  //       console.log("could not validate token", fail);
  //       this.emitAuthStatus(null);
  //     });
  // }

  getCurrentUser() {
    return this.currentUser;
  }

  // logout() {
  //   this.authService.signOut()
  //     .subscribe(
  //     success => {
  //       this.loggedIn = false;
  //       this.currentUser = null;
  //       this.emitAuthStatus(null);
  //     },
  //     error => {
  //       console.log("logout failed", error);
  //       this.emitAuthStatus(null);
  //     });
  // }

  private emitAuthStatus(data: any) {
    let obj = {
      loggedIn: this.loggedIn,
      currentUser: this.currentUser,
      data: data
    };
    this.statusEmitter.emit(obj);
    console.log("emit", obj);
  }

  public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
    return this.statusEmitter.subscribe(onNext, onThrow, onReturn);
  }
}
