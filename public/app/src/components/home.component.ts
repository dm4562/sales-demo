import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProtectedDirective } from '../directives/protected.directive';

@Component({
  selector: 'home',
  templateUrl: 'app/templates/home.component.html',
  directives: [ProtectedDirective]
})

export class HomeComponent implements OnInit, OnDestroy {
  private sub: any;

  constructor(
    private sessions: SessionsService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {

  }

  validate() {
    this.sessions.validateToken();
  }

  ngOnDestroy() {

  }
}
