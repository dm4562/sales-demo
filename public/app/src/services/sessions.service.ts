import { AuthService, AuthHttp } from 'angular2-devise-token-auth';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Headers, Http, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';

import { LoginForm } from '../models/login-form';
import { User } from '../models/user';

@Injectable()
export class SessionsService {
  private loginUrl = "http://localhost:3000/auth/";
  private signIn = "sign_in";

  private loggedIn: boolean = false;
  private currentUser: User = null;

  @Output() statusEmitter = new EventEmitter();

  constructor(
    private authService: AuthService,
    private authHttp: AuthHttp
  ) { }

  // loginUser(form: LoginForm) {
  //   let body = JSON.stringify(form);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   console.log("form", body)
  //   return this.http.post(this.loginUrl, body, options)
  //     .subscribe(
  //     res => console.log('success', res),
  //     res => console.log('fail', res)
  //     );
  // }

  login(form: LoginForm) {
    this.authService.signIn(form)
      .subscribe(
      (res) => {
        this.loggedIn = true;
        this.currentUser = res.json().data;
        // console.log(this.currentUser);
        // console.log(res);
        this.emitAuthStatus(null);
      },
      (error) => {
        console.log("login failed", error);
        this.loggedIn = false;
        this.currentUser = null;
        this.emitAuthStatus(null);
      });
  }

  isLoggedIn() {
    this.authService.validateToken()
      .subscribe(
      (success) => {
        this.loggedIn = true;
        this.emitAuthStatus(null);
      },
      (fail) => {
        this.loggedIn = false;
        this.currentUser = null;
        console.log("could not validate token", fail);
        this.emitAuthStatus(null);
      });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.authService.signOut()
      .subscribe(
      success => {
        this.loggedIn = false;
        this.currentUser = null;
        this.emitAuthStatus(null);
      },
      error => {
        console.log("logout failed", error);
        this.emitAuthStatus(null);
      });
  }

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
