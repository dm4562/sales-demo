import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Locker } from 'angular2-locker';

import { ProtectedDirective } from '../directives/protected.directive';
import { User } from '../models/user';
import { NewPassword } from '../models/new-password';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'profile',
  templateUrl: 'app/templates/profile.component.html',
  directives: [ProtectedDirective],
  providers: [SessionsService]
})

export class ProfileComponent implements OnInit {

  @Input() currentUser: User;
  @Input() password: string;
  @Input() newPassword: NewPassword = new NewPassword();
  @Input() updatePassword = false;
  @Input() changePassword = false;

  private error = false;
  private success = false;

  constructor(
    private sessions: SessionsService,
    private locker: Locker
  ) { }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
  }

  ngOnInit() {
    if (this.locker.has("currentUser")) {
      this.currentUser = this.locker.get("currentUser");
    } else {
      this.sessions.emitAuthStatus(null);
    }
  }
}
