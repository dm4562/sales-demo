import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeroService } from '../services/hero.service';
import { SessionsService } from '../services/sessions.service';
import '../rxjs-extensions';

@Component({
  selector: 'my-app',
  template: `
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/styles/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService,
    SessionsService
  ]
})

export class AppComponent {
  title = 'Tour of Heroes';
}
