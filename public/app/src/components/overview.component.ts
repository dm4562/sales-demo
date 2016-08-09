import { Component } from '@angular/core';

import { ProtectedDirective } from '../directives/protected.directive';
import { AdminDirective } from '../directives/admin.directive';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'overview',
  templateUrl: 'app/templates/overview.component.html',
  directives: [
    ProtectedDirective,
    AdminDirective,
    NavbarComponent
  ]
})

export class OverviewComponent { }
