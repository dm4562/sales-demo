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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var login_form_1 = require('../models/login-form');
var sessions_service_1 = require('../services/sessions.service');
var LoginFormComponent = (function () {
    function LoginFormComponent(sessions, location, router) {
        this.sessions = sessions;
        this.location = location;
        this.router = router;
        this.sub = null;
        this.form = new login_form_1.LoginForm();
    }
    LoginFormComponent.prototype.onSubmit = function () {
        this.sessions.login(this.form);
    };
    LoginFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.sessions.subscribe(function (val) {
            if (val.loggedIn) {
                _this.location.replaceState('/');
                _this.router.navigateByUrl('/');
            }
        });
    };
    LoginFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', login_form_1.LoginForm)
    ], LoginFormComponent.prototype, "form", void 0);
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            templateUrl: 'app/templates/sessions/new.html',
            styleUrls: ['app/styles/login-form.component.scss']
        }), 
        __metadata('design:paramtypes', [sessions_service_1.SessionsService, common_1.Location, router_1.Router])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map