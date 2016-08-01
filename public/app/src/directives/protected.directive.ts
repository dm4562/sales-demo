import { Directive, OnInit, OnDestroy } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Directive({
  selector: 'protected'
})

export class ProtectedDirective implements OnInit, OnDestroy {

  private sub: any;

  constructor(
    private sessions: SessionsService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.sub = this.sessions.subscribe(
      val => {
        if (val.currentUser === (undefined || null)) {
          this.location.replaceState('/');
          this.router.navigateByUrl('/sign_in');
        }
      });
    console.log("authenticating");
    this.sessions.isLoggedIn();
  }

  ngOnDestroy() {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }
}
