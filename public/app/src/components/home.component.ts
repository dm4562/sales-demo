import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ProtectedDirective } from '../directives/protected.directive';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { User } from '../models/user';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'home',
  templateUrl: 'app/templates/home.component.html',
  directives: [ProtectedDirective, NavbarComponent],
  providers: [HeroService]
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private sub: any;
  heroes: Hero[];
  private currentUser: User;

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

    this.currentUser = this.sessions.getCurrentUser();
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

  goToHeroList() {
    this.router.navigateByUrl('/heroes');
  }

  ngOnDestroy() {

  }
}
