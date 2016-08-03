import { provideRouter, RouterConfig } from '@angular/router';
import { HeroesComponent } from './components/heroes.component';
import { DashboardComponent } from './components/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { LoginFormComponent } from './components/login-form.component';
import { HomeComponent } from './components/home.component';
import { SolarHomeComponent } from './components/solar-home.component';
import { HeroFormComponent } from './components/hero-form.component';
import { ProfileComponent } from './components/profile.component';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent,
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
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'add_hero',
    component: HeroFormComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
]
