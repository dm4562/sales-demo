"use strict";
var router_1 = require('@angular/router');
var heroes_component_1 = require('./components/heroes.component');
var dashboard_component_1 = require('./components/dashboard.component');
var hero_detail_component_1 = require('./components/hero-detail.component');
var login_form_component_1 = require('./components/login-form.component');
var home_component_1 = require('./components/home.component');
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'heroes',
        component: heroes_component_1.HeroesComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'detail/:id',
        component: hero_detail_component_1.HeroDetailComponent
    },
    {
        path: 'sign_in',
        component: login_form_component_1.LoginFormComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map