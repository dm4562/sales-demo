import { Component, AfterViewInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeroService } from '../services/hero.service';
import { SessionsService } from '../services/sessions.service';
import { User } from '../models/user';
import '../rxjs-extensions';

@Component({
  selector: 'my-app',
  templateUrl: 'app/templates/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService,
    SessionsService
  ]
})

export class AppComponent implements AfterViewInit {
  @Input() private contentLoaded: boolean = false;
  private currentUser: User;

  constructor(
    private sessions: SessionsService,
  ) { }

  logout() {
    this.sessions.logout();
  }

  ngAfterViewInit() {
  }
}
