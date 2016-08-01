import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { LoginForm } from '../models/login-form';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'login-form',
  templateUrl: 'app/templates/sessions/new.html',
  styleUrls: ['app/styles/login-form.component.scss']
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private sub: any = null;
  @Input() form: LoginForm = new LoginForm();

  constructor(
    private sessions: SessionsService,
    private location: Location,
    private router: Router
  ) { }

  onSubmit() {
    this.sessions.login(this.form);
  }

  ngOnInit() {
    this.sub = this.sessions.subscribe(
      val => {
        if (val.loggedIn) {
          this.location.replaceState('/');
          this.router.navigateByUrl('/');
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
