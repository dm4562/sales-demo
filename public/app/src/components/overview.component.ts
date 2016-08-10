import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProtectedDirective } from '../directives/protected.directive';
import { AdminDirective } from '../directives/admin.directive';
import { NavbarComponent } from './navbar.component';
import { DestinationService } from '../services/destination.service';
import { Destination } from '../models/destination';

@Component({
  selector: 'overview',
  templateUrl: 'app/templates/overview.component.html',
  directives: [
    ProtectedDirective,
    AdminDirective,
    NavbarComponent
  ]
})

export class OverviewComponent implements OnInit {
  overallHighest: Destination;
  overallLowest: Destination;
  userData: any;

  constructor(
    private router: Router,
    private destinationService: DestinationService
  ) { }

  ngOnInit() {
    this.getOverview();
  }

  getOverview() {
    this.destinationService.getDestinationOverview()
      .then(res => {
        this.overallHighest = res.highest_rated;
        this.overallLowest = res.lowest_rated;
        this.userData = res.user_info;
      });
  }
}
