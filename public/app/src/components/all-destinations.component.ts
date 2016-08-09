import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProtectedDirective } from '../directives/protected.directive';
import { AdminDirective } from '../directives/admin.directive';
import { NavbarComponent } from './navbar.component';
import { Destination } from '../models/destination';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'all-destinations',
  templateUrl: 'app/templates/all-destinations.component.html',
  directives: [
    AdminDirective,
    NavbarComponent
  ]
})

export class AllDestinationsComponent {
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
    this.destinationService.getAllDestinations().then(
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
