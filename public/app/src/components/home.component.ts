import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ProtectedDirective } from '../directives/protected.directive';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';

@Component({
  selector: 'home',
  templateUrl: 'app/templates/home.component.html',
  directives: [ProtectedDirective],
  providers: [HeroService]
})

export class HomeComponent implements OnInit, OnDestroy {
  private sub: any;
  heroes: Hero[];

  constructor(
    private sessions: SessionsService,
    private router: Router,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.heroService.getTopHeroes().then(
      (heroes: Hero[]) => this.heroes = heroes
    ).catch(error => console.log("couldn't get heroes", error));
  }

  validate() {
    this.sessions.validateToken();
  }

  logout() {
    this.sessions.logout();
  }

  ngOnDestroy() {

  }
}
