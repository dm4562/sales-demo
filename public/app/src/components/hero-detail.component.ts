import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/templates/hero-detail.component.html',
  styleUrls: ['app/styles/hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated: boolean = false;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id).then(
          (hero) => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.heroService.save(this.hero).then(
      (hero) => {
        this.hero = hero;
        this.goBack(hero);
      }).catch(
      (error) => this.error = error
      );
  }

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }

};
