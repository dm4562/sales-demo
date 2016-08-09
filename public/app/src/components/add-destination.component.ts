import { Component, Input, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProtectedDirective } from '../directives/protected.directive';
import { NavbarComponent } from './navbar.component';
import { Destination } from '../models/destination';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'add-destination',
  templateUrl: 'app/templates/add-destination.component.html',
  directives: [ProtectedDirective, NavbarComponent]
})

export class AddDestinationComponent implements AfterViewInit {
  @Input() newDestination = new Destination();
  private continents: string[];
  @Input() image: boolean = false;
  private status: string = null;
  private success = false;
  private error = false;

  constructor(
    private destinationService: DestinationService
  ) { }

  ngAfterViewInit() {
    this.destinationService.getContinents().then(
      (success: string[]) => {
        this.continents = success;
        this.newDestination.continent = success[0]
      },
      (failure) => console.log("Couldnt get continents")
    );
  }

  addDestination() {
    this.destinationService.save(this.newDestination).then(
      (success) => {
        this.success = true;
        this.error = false;
        this.newDestination = new Destination();
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
