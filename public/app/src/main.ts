// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

// The usual bootstrapping imports
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// devise auth imports
import { AUTH_PROVIDERS, authService } from 'angular2-devise-token-auth';

import { AppComponent } from './components/app.component';
import { appRouterProviders } from './app.routes';
// enableProdMode();

bootstrap(AppComponent, [
  disableDeprecatedForms,
  provideForms,
  appRouterProviders,
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  authService('http://localhost:3000/auth'),
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]);
