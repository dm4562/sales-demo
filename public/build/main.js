"use strict";
var angular2_locker_1 = require('angular2-locker');
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var app_component_1 = require('./components/app.component');
var app_routes_1 = require('./app.routes');
// enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    app_routes_1.appRouterProviders,
    http_1.HTTP_PROVIDERS,
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
    core_1.provide(angular2_locker_1.LockerConfig, {
        useValue: new angular2_locker_1.LockerConfig('superheroApp', angular2_locker_1.Locker.DRIVERS.SESSION)
    }),
    angular2_locker_1.Locker
]);
//# sourceMappingURL=main.js.map