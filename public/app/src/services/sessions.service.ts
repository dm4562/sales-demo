import { Injectable, EventEmitter, Output } from '@angular/core';
import { Headers, Http, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';

import { LoginForm } from '../models/login-form';
import { User } from '../models/user';
import { NewPassword } from '../models/new-password';

import { Locker } from 'angular2-locker';

declare var _uiq: any;

@Injectable()
export class SessionsService {
  private url = "http://localhost:3001/auth/";

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
    this.http.post(`${this.url}sign_in`, body, options)
      .subscribe(
      (success: Response) => {
        let headers = success.headers;
        this.currentUser = success.json().data;
        this.currentUser.authHeaders = {
          'Content-Type': 'application/json',
          'Access-Token': headers.get('Access-Token'),
          'Client': headers.get('Client'),
          'Uid': headers.get('Uid'),
          'Expiry': headers.get('Expiry'),
          'Token-Type': headers.get('Token-Type')
        };
        this.loggedIn = true;
        // console.log("sessions user", this.currentUser);
        this.locker.set(this.lockerKey, (this.currentUser));
        this.setUIQVariables(this.currentUser);
        this.emitAuthStatus(null);
        console.log("user", this.currentUser);
      },
      (fail: Response) => {
        console.log('login failed');
        this.currentUser = null;
        this.locker.remove(this.lockerKey);
        this.loggedIn = false;
        this.emitAuthStatus(null);
      });
  }

  isLoggedIn() {
    if (this.locker.has(this.lockerKey)) {
      this.currentUser = this.locker.get(this.lockerKey);
      this.setUIQVariables(this.currentUser);
      this.validateToken();
    } else {
      this.currentUser = null;
      this.loggedIn = false;
      this.emitAuthStatus(null);
    }
  }

  validateToken() {
    if (this.currentUser !== null) {
      let headers = new Headers(this.currentUser.authHeaders);
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
          // window['currentUser'] = this.currentUser;
          this.locker.remove(this.lockerKey);
          console.log("could not validate token");
          this.emitAuthStatus(null);
        });
    } else {
      this.emitAuthStatus(null);
    }
  }

  getCurrentUser() {
    if (this.locker.has('currentUser')) {
      return this.locker.get('currentUser');
    } else {
      this.loggedIn = false;
      this.currentUser = null;
      this.emitAuthStatus(null);
      return null;
    }
  }

  logout() {
    if (this.currentUser !== null) {
      let headers = new Headers(this.currentUser.authHeaders);
      let options = new RequestOptions({ headers: headers });
      this.http.delete(`${this.url}sign_out`, options).subscribe(
        (res: Response) => {
          console.log("logout successful");
          this.currentUser = null;
          window['currentUser'] = this.currentUser;
          this.loggedIn = false;
          this.locker.remove(this.lockerKey);
          this.emitAuthStatus(null);
        },
        (error: Response) => {
          this.currentUser = null;
          this.loggedIn = false;
          window['currentUser'] = this.currentUser;
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

  updateProfile(user: User, currentPassword: string, newPassword?: NewPassword) {
    let headers = new Headers(this.currentUser.authHeaders);
    let options = new RequestOptions({ headers: headers });
    let params: any;
    if (newPassword) {
      params = {
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        current_password: currentPassword,
        password: newPassword.password,
        password_confirmation: newPassword.confirmation
      }
    } else {
      params = {
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        current_password: currentPassword
      }
    }
    this.http.put(`${this.url}`, JSON.stringify(params), options)
      .toPromise()
      .then(
      (success) => {
        this.currentUser = success.json().data;
        this.locker.set(this.lockerKey, this.currentUser);
        this.setUIQVariables(this.currentUser);
        this.emitAuthStatus("success");
      },
      (failure) => {
        this.emitAuthStatus(null);
        console.log("profile couldnt be updated");
        this.emitAuthStatus("failure");
      });
  }

  private setUIQVariables(user: User) {
    _uiq.push(['setCustomVariable', '1', 'user_id', user.id, 'visit']);
    _uiq.push(['setCustomVariable', '2', 'user_name', user.name, 'visit']);
    _uiq.push(['setCustomVariable', '3', 'user_email', user.email, 'visit']);
    //_uiq.push(['setCustomVariable','4','account_name','Stark Industries','visit']);
    //_uiq.push(['setCustomVariable','5','user_email','tony.stark@stark.com','visit']);
    //_uiq.push(['setCustomVariable','6','signup_date','2015-03-14','visit']);
    _uiq.push(["trackPageView"]);
  }

  public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
    return this.statusEmitter.subscribe(onNext, onThrow, onReturn);
  }
}
