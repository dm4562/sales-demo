import { provideRouter, RouterConfig } from '@angular/router';

import { DestinationsComponent } from './components/destinations.component';
import { DestinationDetailComponent } from './components/destination-detail.component';
import { LoginFormComponent } from './components/login-form.component';
import { HomeComponent } from './components/home.component';
import { AddDestinationComponent } from './components/add-destination.component';
import { ProfileComponent } from './components/profile.component';
import { AllDestinationsComponent } from './components/all-destinations.component';
import { OverviewComponent } from './components/overview.component';

const routes: RouterConfig = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'destinations',
    component: DestinationsComponent
  },
  {
    path: 'detail/:id',
    component: DestinationDetailComponent
  },
  {
    path: 'sign_in',
    component: LoginFormComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'add_destination',
    component: AddDestinationComponent
  },
  {
    path: 'all_destinations',
    component: AllDestinationsComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
]
