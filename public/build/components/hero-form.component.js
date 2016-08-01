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
var protected_directive_1 = require('../directives/protected.directive');
var hero_1 = require('../models/hero');
var hero_service_1 = require('../services/hero.service');
var HeroFormComponent = (function () {
    function HeroFormComponent(heroService) {
        this.heroService = heroService;
        this.newHero = new hero_1.Hero();
        this.image = false;
        this.status = null;
        this.success = false;
        this.error = false;
    }
    HeroFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.heroService.getPowerTypes().then(function (success) {
            _this.powerTypes = success;
            _this.newHero.power_type = success[0];
        }, function (failure) { return console.log("Couldnt get types"); });
    };
    HeroFormComponent.prototype.addHero = function () {
        var _this = this;
        this.heroService.save(this.newHero).then(function (success) {
            _this.success = true;
            _this.error = false;
            _this.newHero = new hero_1.Hero();
        }, function (failure) {
            _this.error = true;
            _this.success = false;
        });
    };
    HeroFormComponent.prototype.toggleSuccess = function () {
        this.success = !this.success;
    };
    HeroFormComponent.prototype.toggleError = function () {
        this.error = !this.error;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeroFormComponent.prototype, "newHero", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeroFormComponent.prototype, "image", void 0);
    HeroFormComponent = __decorate([
        core_1.Component({
            selector: 'hero-form',
            templateUrl: 'app/templates/hero-form.component.html',
            directives: [protected_directive_1.ProtectedDirective]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroFormComponent);
    return HeroFormComponent;
}());
exports.HeroFormComponent = HeroFormComponent;
//# sourceMappingURL=hero-form.component.js.map