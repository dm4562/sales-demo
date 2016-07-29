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
var router_1 = require('@angular/router');
var hero_service_1 = require('../services/hero.service');
var sessions_service_1 = require('../services/sessions.service');
require('../rxjs-extensions');
var AppComponent = (function () {
    function AppComponent(sessions) {
        this.sessions = sessions;
        this.contentLoaded = false;
        this.title = 'Tour of Heroes';
    }
    AppComponent.prototype.logout = function () {
        this.sessions.logout();
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.contentLoaded = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AppComponent.prototype, "contentLoaded", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/templates/app.component.html',
            styleUrls: ['app/styles/app.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [
                hero_service_1.HeroService,
                sessions_service_1.SessionsService
            ]
        }), 
        __metadata('design:paramtypes', [sessions_service_1.SessionsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map