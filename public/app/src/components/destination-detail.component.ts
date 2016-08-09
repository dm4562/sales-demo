import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProtectedDirective } from '../directives/protected.directive';
import { NavbarComponent } from './navbar.component';
import { Destination } from '../models/destination';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'destination-detail',
  templateUrl: 'app/templates/destination-detail.component.html',
  directives: [ProtectedDirective, NavbarComponent]
})


export class DestinationDetailComponent implements OnInit, OnDestroy {
  @Input() destination: Destination;
  @Output() close = new EventEmitter();
  error: boolean = false;
  sub: any;
  navigated: boolean = false;
  showEdit = false;
  continents: string[];
  success = false;

  constructor(
    private destinationService: DestinationService,
    private route: ActivatedRoute
  ) { }

  editDestination() {
    this.destinationService.save(this.destination).then(
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

  deleteDestination() {
    this.destinationService.delete(this.destination.id).then(
      success => {
        this.goBack();
      },
      error => {
        console.log("destination could not be deleted");
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
        this.destinationService.getDestination(id).then(
          (h) => {
            this.destination = h;
            // console.log(this.destination);
          });
      } else {
        this.navigated = false;
        this.destination = new Destination();
      }
    });
    this.destinationService.getContinents().then(
      (success: string[]) => {
        this.continents = success;
      },
      (failure) => console.log("Couldnt get types")
    );
    // console.log(this.destination);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedDestination: Destination = null) {
    this.close.emit(savedDestination);
    if (this.navigated) {
      window.history.back();
    }
  }

};
