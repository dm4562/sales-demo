import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private sub: any;
  heroes: Hero[];

  constructor(
    private sessions: SessionsService,
    private router: Router,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngAfterViewInit() {
    console.log("heroes call");
    this.heroService.getTopHeroes().then(
      (heroes: Hero[]) => this.heroes = heroes
    ).catch(error => console.log("couldn't get heroes", error));
  }

  ngOnInit() {
    // console.log("oninit");
  }

  goToAddHero() {
    this.router.navigateByUrl('/add_hero');
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
