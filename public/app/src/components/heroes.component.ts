import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { Router } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../services/hero.service';
import { ProtectedDirective } from '../directives/protected.directive';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/templates/heroes.component.html',
  styleUrls: ['app/styles/heroes.component.css'],
  directives: [
    HeroDetailComponent,
    ProtectedDirective
  ]
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  title = 'Tour of Heroes';
  selectedHero: Hero;
  error: any;
  addingHero: boolean;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().then(
      heroes => {
        console.log(heroes);
        this.heroes = heroes
      });
    console.log(this.heroes);
  }

  goToDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes; }
  }

  deleteHero(id: number) {
    // event.stopPropagation();
    this.heroService
      .delete(id)
      .then(res => this.getHeroes())
      .catch(error => this.error = error);
  }

  goToAddHero() {
    this.router.navigateByUrl('/add_hero');
  }
}
