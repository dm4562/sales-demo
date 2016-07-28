import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'home',
  template: ''
  // directives: [SessionsService]
})

export class HomeComponent implements OnInit, OnDestroy {

  private sub: any;

  constructor(
    private sessions: SessionsService,
    private router: Router,
    private location: Location
  ) { }
  ngOnInit() {
    this.sub = this.sessions.statusEmitter.subscribe(
      val => {
        if (!val.loggedIn) {
          this.location.replaceState('/');
          this.router.navigateByUrl('/sign_in');
        } else {
          this.location.replaceState('/');
          this.router.navigateByUrl('/dashboard');
        }
      }
    )

    this.sessions.isLoggedIn()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
