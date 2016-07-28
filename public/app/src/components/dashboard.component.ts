import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { Router } from '@angular/router';
import { HeroSearchComponent } from './hero-search.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/templates/dashboard.component.html',
  styleUrls: ['app/styles/dashboard.component.css'],
  directives: [HeroSearchComponent]
})

export class DashboardComponent implements OnInit {

  heroes: Hero[];

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.heroService.getHeroes().then(
      (heroes) => this.heroes = heroes.slice(1, 5)
    );
  }

  goToDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
