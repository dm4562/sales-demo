import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { ProtectedDirective } from '../directives/protected.directive';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/templates/hero-detail.component.html',
  styleUrls: ['app/styles/hero-detail.component.css'],
  directives: [ProtectedDirective]
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

  editHero() {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        // console.log(id);
        this.navigated = true;
        this.heroService.getHero(id).then(
          (h) => {
            this.hero = h;
            // console.log(this.hero);
          });
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
    // console.log(this.hero);
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
