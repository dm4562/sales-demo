import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { LoginForm } from '../models/login-form';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'login-form',
  templateUrl: 'app/templates/sessions/new.html'
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private sub: any = null;
  @Input() form: LoginForm = new LoginForm();
  submitted: boolean = false;

  constructor(
    private sessions: SessionsService,
    private location: Location,
    private router: Router
  ) { }

  onSubmit() {
    this.submitted = true;
    this.sessions.login(this.form);
    // console.log(this.sessions.getCurrentUser());
  }

  ngOnInit() {
    this.sub = this.sessions.statusEmitter.subscribe(
      val => {
        console.log("caught", val);
        if (val.loggedIn) {
          console.log("caught", val);
          this.location.replaceState('/');
          this.router.navigateByUrl('/dashboard');
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
