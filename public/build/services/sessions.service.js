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
var angular2_locker_1 = require('angular2-locker');
var SessionsService = (function () {
    function SessionsService(http, locker) {
        this.http = http;
        this.locker = locker;
        this.url = "http://localhost:3000/auth/";
        this.loggedIn = false;
        this.currentUser = null;
        this.lockerKey = 'currentUser';
        this.statusEmitter = new core_1.EventEmitter();
        if (this.locker.has(this.lockerKey)) {
            this.currentUser = this.locker.get('currentUser');
        }
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
            _this.currentUser.authHeaders = new http_1.Headers({
                'Content-Type': 'application/json',
                'access-token': headers.get('access-token'),
                'client': headers.get('client'),
                'uid': headers.get('uid'),
                'expiry': headers.get('expiry')
            });
            _this.loggedIn = true;
            _this.locker.set(_this.lockerKey, _this.currentUser);
            _this.emitAuthStatus(null);
            console.log("user", _this.currentUser);
        }, function (fail) {
            console.log('login failed', fail);
            _this.currentUser = null;
            _this.locker.remove(_this.lockerKey);
            _this.loggedIn = false;
        });
    };
    SessionsService.prototype.isLoggedIn = function () {
        if (this.locker.has(this.lockerKey)) {
            this.currentUser = this.locker.get(this.lockerKey);
            this.validateToken();
        }
        else {
            this.currentUser = null;
            this.loggedIn = false;
            this.emitAuthStatus(null);
        }
    };
    SessionsService.prototype.validateToken = function () {
        var _this = this;
        if (this.currentUser !== null) {
            var headers = this.currentUser.authHeaders;
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.get(this.url + "validate_token", options).subscribe(function (success) {
                // console.log("token valid");
                _this.loggedIn = true;
                _this.emitAuthStatus(null);
            }, function (fail) {
                _this.loggedIn = false;
                _this.currentUser = null;
                _this.locker.remove(_this.lockerKey);
                console.log("could not validate token", fail);
                _this.emitAuthStatus(null);
            });
        }
        else {
            this.emitAuthStatus(null);
        }
    };
    SessionsService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    SessionsService.prototype.logout = function () {
        var _this = this;
        if (this.currentUser !== null) {
            var headers = this.currentUser.authHeaders;
            var options = new http_1.RequestOptions({ headers: headers });
            this.http.delete(this.url + "sign_out", options).subscribe(function (res) {
                console.log("logout successful");
                _this.currentUser = null;
                _this.loggedIn = false;
                _this.locker.remove(_this.lockerKey);
                _this.emitAuthStatus(null);
            }, function (error) {
                _this.currentUser = null;
                _this.loggedIn = false;
                _this.locker.remove(_this.lockerKey);
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
        // console.log("emit", obj);
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
        __metadata('design:paramtypes', [http_1.Http, angular2_locker_1.Locker])
    ], SessionsService);
    return SessionsService;
}());
exports.SessionsService = SessionsService;
//# sourceMappingURL=sessions.service.js.map