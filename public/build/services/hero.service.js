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
require('rxjs/add/operator/toPromise');
var sessions_service_1 = require('./sessions.service');
var angular2_locker_1 = require('angular2-locker');
var HeroService = (function () {
    function HeroService(http, locker, sessions) {
        this.http = http;
        this.locker = locker;
        this.sessions = sessions;
        this.baseUrl = 'http://localhost:3000'; // URL to web API
        this.powerTypes = [
            'Cosmic',
            'Mystic',
            'Science',
            'Skill',
            'Technology'
        ];
    }
    HeroService.prototype.getTopHeroes = function () {
        if (this.locker.has('currentUser')) {
            var options = new http_1.RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
            return this.http.get(this.baseUrl + "/top_four_heroes", options)
                .toPromise()
                .then(function (res) { return res.json().heroes; })
                .catch(this.handleError);
        }
    };
    HeroService.prototype.getHeroes = function () {
        if (this.locker.has('currentUser')) {
            return this.http.get(this.baseUrl)
                .toPromise()
                .then(function (response) { return response.json().data; })
                .catch(this.handleError);
        }
    };
    HeroService.prototype.getPowerTypes = function () {
        return Promise.resolve(this.powerTypes).then(function (response) { return response; });
    };
    // getHeroesSlowly() {
    //   return new Promise<Hero[]>(resolve =>
    //     setTimeout(() => resolve(HEROES), 2000)
    //   );
    // }
    HeroService.prototype.getHero = function (id) {
        return this.getHeroes().then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        this.sessions.emitAuthStatus(null);
        return Promise.reject(error.message || error);
    };
    HeroService.prototype.post = function (hero) {
        var options = new http_1.RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
        return this.http.post(this.baseUrl + "/heros", JSON.stringify(hero), options)
            .toPromise().then(function (res) { return res.json().hero; })
            .catch(this.handleError);
    };
    // Update existing Hero
    HeroService.prototype.put = function (hero) {
        var options = new http_1.RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
        var url = this.baseUrl + "/heros/" + hero.id;
        return this.http
            .put(url, JSON.stringify(hero), options)
            .toPromise()
            .then(function (res) { return res.json().hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (hero) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.baseUrl + "/" + hero.id;
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    };
    HeroService.prototype.save = function (hero) {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_locker_1.Locker, sessions_service_1.SessionsService])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map