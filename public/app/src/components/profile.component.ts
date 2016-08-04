import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  @Input() currentPassword: string;
  @Input() newPassword: NewPassword = new NewPassword();
  @Input() updatePassword = false;
  @Input() changePassword = false;

  private sub: any;
  private error = false;
  private success = false;

  constructor(
    private sessions: SessionsService
  ) { }

  toggleSuccess() {
    this.success = !this.success;
  }

  toggleError() {
    this.error = !this.error;
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
  }

  ngOnInit() {
    this.currentUser = this.sessions.getCurrentUser();
    if (!this.currentUser) {
      this.sessions.emitAuthStatus(null);
    }
    this.sub = this.sessions.subscribe(
      (val) => {
        if (val.data === 'success') {
          this.success = true;
          this.currentUser = this.sessions.getCurrentUser();
          this.error = false;
          let form;
          if (this.changePassword) {
            form = {
              email: this.currentUser.email,
              password: this.newPassword.password
            }
          } else {
            form = {
              email: this.currentUser.email,
              password: this.currentPassword
            }
          }
          console.log(form);
          this.currentPassword = "";
          this.newPassword = new NewPassword();
          this.sessions.login(form);
        } else if (val.data === 'failure') {
          this.error = true;
          this.success = false;
          this.currentPassword = null;
          this.newPassword = new NewPassword();
        }
      }
    )
  }

  updateProfile() {
    if (this.changePassword) {
      this.sessions.updateProfile(this.currentUser, this.currentPassword, this.newPassword);
    } else {
      this.sessions.updateProfile(this.currentUser, this.currentPassword);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
