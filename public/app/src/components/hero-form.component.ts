import { Component, Input, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProtectedDirective } from '../directives/protected.directive';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'hero-form',
  templateUrl: 'app/templates/hero-form.component.html',
  directives: [ProtectedDirective]
})

export class HeroFormComponent implements AfterViewInit {
  @Input() newHero = new Hero();
  private powerTypes: string[];
  @Input() image: boolean = false;
  private status: string = null;
  private success = false;
  private error = false;

  constructor(
    private heroService: HeroService
  ) { }

  ngAfterViewInit() {
    this.heroService.getPowerTypes().then(
      (success) => {
        this.powerTypes = success;
        this.newHero.power_type = success[0]
      },
      (failure) => console.log("Couldnt get types")
    );
  }

  addHero() {
    this.heroService.save(this.newHero).then(
      (success) => {
        this.success = true;
        this.error = false;
        this.newHero = new Hero();
      },
      (failure) => {
        this.error = true;
        this.success = false;
      }
    )
  }

  toggleSuccess() {
    this.success = !this.success;
  }

  toggleError() {
    this.error = !this.error;
  }

}
