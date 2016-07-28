"use strict";
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
// devise auth imports
var angular2_devise_token_auth_1 = require('angular2-devise-token-auth');
var app_component_1 = require('./components/app.component');
var app_routes_1 = require('./app.routes');
// enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms,
    forms_1.provideForms,
    app_routes_1.appRouterProviders,
    http_1.HTTP_PROVIDERS,
    angular2_devise_token_auth_1.AUTH_PROVIDERS,
    angular2_devise_token_auth_1.authService('http://localhost:3000/auth'),
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
]);
//# sourceMappingURL=main.js.map