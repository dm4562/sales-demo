import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/templates/heroes.component.html',
  styleUrls: ['app/styles/heroes.component.css'],
  directives: [HeroDetailComponent]
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

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  goToDetail() {
    this.router.navigate(['detail', this.selectedHero.id]);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes; }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
  }
}
