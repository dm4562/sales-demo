import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProtectedDirective } from '../directives/protected.directive';
import { NavbarComponent } from './navbar.component';
import { Destination } from '../models/destination';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/templates/heroes.component.html',
  directives: [
    ProtectedDirective,
    NavbarComponent
  ]
})

export class HeroesComponent implements OnInit {
  destinations: Destination[];
  error: any;

  constructor(
    private destinationService: DestinationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDestinations();
  }

  getDestinations() {
    this.destinationService.getUserDestinations().then(
      (destinations: Destination[]) => {
        // console.log(heroes);
        this.destinations = destinations;
      });
    // console.log(this.heroes);
  }

  goToDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

  deleteDestination(id: number) {
    // event.stopPropagation();
    this.destinationService
      .delete(id)
      .then(res => this.getDestinations())
      .catch(error => this.error = error);
  }

  goToAddDestination() {
    this.router.navigateByUrl('/add_hero');
  }
}
