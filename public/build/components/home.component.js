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
var HomeComponent = (function () {
    function HomeComponent(sessions, router, location) {
        this.sessions = sessions;
        this.router = router;
        this.location = location;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.sessions.statusEmitter.subscribe(function (val) {
            if (!val.loggedIn) {
                _this.location.replaceState('/');
                _this.router.navigateByUrl('/sign_in');
            }
            else {
                _this.location.replaceState('/');
                _this.router.navigateByUrl('/dashboard');
            }
        });
        this.sessions.isLoggedIn();
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: ''
        }), 
        __metadata('design:paramtypes', [sessions_service_1.SessionsService, router_1.Router, common_1.Location])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map