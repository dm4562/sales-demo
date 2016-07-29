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
var sessions_service_1 = require('../services/sessions.service');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var protected_directive_1 = require('../directives/protected.directive');
var HomeComponent = (function () {
    function HomeComponent(sessions, router, location) {
        this.sessions = sessions;
        this.router = router;
        this.location = location;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.validate = function () {
        this.sessions.validateToken();
    };
    HomeComponent.prototype.logout = function () {
        this.sessions.logout();
    };
    HomeComponent.prototype.ngOnDestroy = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/templates/home.component.html',
            directives: [protected_directive_1.ProtectedDirective]
        }), 
        __metadata('design:paramtypes', [sessions_service_1.SessionsService, router_1.Router, common_1.Location])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map