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
  error: boolean = false;
  sub: any;
  navigated: boolean = false;
  showEdit = false;
  powerTypes: string[];
  success = false;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  editHero() {
    this.heroService.save(this.hero).then(
      (success) => {
        this.success = true;
        this.showEdit = false;
      },
      (failure) => {
        this.error = true;
        this.showEdit = true;
      }
    )
  }

  deleteHero() {
    this.heroService.delete(this.hero.id).then(
      success => {
        this.goBack();
      },
      error => {
        console.log("hero could not be deleted");
      }
    )
  }

  toggleForm() {
    this.showEdit = !this.showEdit;
  }

  toggleSuccess() {
    this.success = !this.success;
  }

  toggleError() {
    this.error = !this.error;
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
    this.heroService.getPowerTypes().then(
      (success) => {
        this.powerTypes = success;
      },
      (failure) => console.log("Couldnt get types")
    );
    // console.log(this.hero);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }

};
