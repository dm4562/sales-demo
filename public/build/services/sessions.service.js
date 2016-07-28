"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_devise_token_auth_1 = require('angular2-devise-token-auth');
var core_1 = require('@angular/core');
var SessionsService = (function () {
    function SessionsService(authService, authHttp) {
        this.authService = authService;
        this.authHttp = authHttp;
        this.loginUrl = "http://localhost:3000/auth/";
        this.signIn = "sign_in";
        this.loggedIn = false;
        this.currentUser = null;
        this.statusEmitter = new core_1.EventEmitter();
    }
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
    SessionsService.prototype.login = function (form) {
        var _this = this;
        this.authService.signIn(form)
            .subscribe(function (res) {
            _this.loggedIn = true;
            _this.currentUser = res.json().data;
            // console.log(this.currentUser);
            // console.log(res);
            _this.emitAuthStatus(null);
        }, function (error) {
            console.log("login failed", error);
            _this.loggedIn = false;
            _this.currentUser = null;
            _this.emitAuthStatus(null);
        });
    };
    SessionsService.prototype.isLoggedIn = function () {
        var _this = this;
        this.authService.validateToken()
            .subscribe(function (success) {
            _this.loggedIn = true;
            _this.emitAuthStatus(null);
        }, function (fail) {
            _this.loggedIn = false;
            _this.currentUser = null;
            console.log("could not validate token", fail);
            _this.emitAuthStatus(null);
        });
    };
    SessionsService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    SessionsService.prototype.logout = function () {
        var _this = this;
        this.authService.signOut()
            .subscribe(function (success) {
            _this.loggedIn = false;
            _this.currentUser = null;
            _this.emitAuthStatus(null);
        }, function (error) {
            console.log("logout failed", error);
            _this.emitAuthStatus(null);
        });
    };
    SessionsService.prototype.emitAuthStatus = function (data) {
        var obj = {
            loggedIn: this.loggedIn,
            currentUser: this.currentUser,
            data: data
        };
        this.statusEmitter.emit(obj);
        console.log("emit", obj);
    };
    SessionsService.prototype.subscribe = function (onNext, onThrow, onReturn) {
        return this.statusEmitter.subscribe(onNext, onThrow, onReturn);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SessionsService.prototype, "statusEmitter", void 0);
    SessionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_devise_token_auth_1.AuthService, angular2_devise_token_auth_1.AuthHttp])
    ], SessionsService);
    return SessionsService;
}());
exports.SessionsService = SessionsService;
//# sourceMappingURL=sessions.service.js.map