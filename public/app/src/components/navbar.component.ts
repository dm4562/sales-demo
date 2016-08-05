import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { User } from '../models/user';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'navbar-pills',
  templateUrl: 'app/templates/navbar.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class NavbarComponent implements OnInit {
  private currentUser: User;

  constructor(private sessions: SessionsService) { }

  ngOnInit() {
    this.currentUser = this.sessions.getCurrentUser();
  }
}
