import { Component, OnInit, Input, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';
import { SessionsService } from '../services/sessions.service';
import { User } from '../models/user';
import '../rxjs-extensions';

@Component({
  selector: 'my-app',
  templateUrl: 'app/templates/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService,
    SessionsService
  ]
})

export class AppComponent implements OnInit, AfterViewChecked, AfterContentInit {
  @Input() private contentLoaded: boolean = false;
  // private currentUser: User;
  private sub: any;

  constructor(
    private sessions: SessionsService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  logout() {
    this.sessions.logout();
  }

  ngOnInit() {
    this.route.url.subscribe(
      (url) => {
        console.log(url);
      }
    )
    // console.log(this.route.snapshot.toString())
    // console.log(this.location.path);
    // console.log(this.router.url);
  }

  ngAfterViewChecked() {
    // router.urlTree.contains(router.createUrlTree(['/login']))
    // console.log(this.route.snapshot.toString());
  }

  ngAfterContentInit() {
    // console.log("lol", this.route.snapshot.toString());
  }

}
