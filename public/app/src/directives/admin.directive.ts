import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models/user';
import { SessionsService } from '../services/sessions.service';

@Directive({
  selector: "admin"
})

export class AdminDirective implements OnInit {
  private currentUser: User;

  constructor(
    private sessions: SessionsService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.sessions.getCurrentUser();
    if (!(this.currentUser && this.currentUser.admin)) {
      this.location.replaceState('/');
      this.router.navigateByUrl('/');
    }
  }
}
