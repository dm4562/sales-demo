import { Component } from '@angular/core';

import { ProtectedDirective } from '../directives/protected.directive';
import { AdminDirective } from '../directives/admin.directive';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'all-destinations',
  templateUrl: 'app/templates/all-destinations.component.html',
  directives: [AdminDirective, NavbarComponent]
})

export class AllDestinationsComponent { }
