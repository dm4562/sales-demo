import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { LoginForm } from '../models/login-form';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'login-form',
  templateUrl: 'app/templates/sessions/new.html',
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private sub: any = null;
  @Input() form: LoginForm = new LoginForm();
  private error = false;

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
        } else {
          this.error = true;
        }
      });
  }

  toggleError() {
    this.error = !this.error;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
