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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var SessionsService = (function () {
    function SessionsService(http) {
        this.http = http;
        this.url = "http://localhost:3000/auth/";
        this.loggedIn = false;
        this.currentUser = null;
        this.statusEmitter = new core_1.EventEmitter();
    }
    SessionsService.prototype.login = function (form) {
        var _this = this;
        var body = JSON.stringify(form);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // console.log("form", body)
        return this.http.post(this.url + "sign_in", body, options)
            .subscribe(function (success) {
            var headers = success.headers;
            _this.currentUser = success.json().data;
            _this.currentUser.accessToken = headers.get('access-token');
            _this.currentUser.client = headers.get('client');
            _this.currentUser.expiry = headers.get('expiry');
            _this.loggedIn = true;
            _this.emitAuthStatus(null);
            console.log("user", _this.currentUser);
        }, function (fail) {
            console.log('login failed', fail);
            _this.currentUser = null;
            _this.loggedIn = false;
        });
    };
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
    SessionsService.prototype.isLoggedIn = function () {
        this.validateToken();
    };
    SessionsService.prototype.validateToken = function () {
        var _this = this;
        if (this.currentUser !== null) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'access-token': this.currentUser.accessToken,
                'client': this.currentUser.client,
                'uid': this.currentUser.uid
            });
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.get(this.url + "validate_token", options).subscribe(function (success) {
                // console.log("token valid");
                _this.loggedIn = true;
                _this.emitAuthStatus(null);
            }, function (fail) {
                _this.loggedIn = false;
                _this.currentUser = null;
                console.log("could not validate token", fail);
                _this.emitAuthStatus(null);
            });
        }
        else {
            this.emitAuthStatus(null);
        }
    };
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
    SessionsService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
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
    SessionsService.prototype.logout = function () {
        var _this = this;
        if (this.currentUser !== null) {
            var headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'uid': this.currentUser.uid,
                'client': this.currentUser.client,
                'access-token': this.currentUser.accessToken
            });
            var options = new http_1.RequestOptions({ headers: headers });
            this.http.delete(this.url + "sign_out", options).subscribe(function (success) {
                console.log("logout successful");
                _this.currentUser = null;
                _this.loggedIn = null;
                _this.emitAuthStatus(null);
            }, function (fail) {
                console.log("couldn't log out", fail);
                _this.emitAuthStatus(null);
            });
        }
        else {
            this.emitAuthStatus(null);
        }
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
        __metadata('design:paramtypes', [http_1.Http])
    ], SessionsService);
    return SessionsService;
}());
exports.SessionsService = SessionsService;
//# sourceMappingURL=sessions.service.js.map