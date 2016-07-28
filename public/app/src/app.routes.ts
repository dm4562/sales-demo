import { provideRouter, RouterConfig } from '@angular/router';
import { HeroesComponent } from './components/heroes.component';
import { DashboardComponent } from './components/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { LoginFormComponent } from './components/login-form.component';
import { HomeComponent } from './components/home.component';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: 'sign_in',
    component: LoginFormComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
]
