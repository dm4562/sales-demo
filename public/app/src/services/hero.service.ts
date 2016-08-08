import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Locker } from 'angular2-locker';

import { Hero } from '../models/hero';
import { SessionsService } from './sessions.service';

@Injectable()
export class HeroService {
  private baseUrl = 'http://localhost:3000'; // URL to web API
  private powerTypes = [
    'Cosmic',
    'Mystic',
    'Science',
    'Skill',
    'Technology'
  ]

  constructor(
    private http: Http,
    private locker: Locker,
    private sessions: SessionsService
  ) { }

  getTopHeroes() {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/top_four_heroes`, options)
        .toPromise()
        .then(res => res.json().heroes as Hero[])
        .catch(this.handleError);
    } else {
      return Promise.reject("not logged in")
        .then()
        .catch(this.handleError);
    }
  }

  getHeroes() {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/heros`, options)
        .toPromise()
        .then(response => response.json().heroes as Hero[])
        .catch(this.handleError);
    } else {
      return Promise.reject("not logged in")
        .then()
        .catch(this.handleError);
    }
  }

  getPowerTypes() {
    return Promise.resolve(this.powerTypes).then(
      response => response as string[]
    )
  }

  getHero(id: number) {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/heros/${id}`, options)
        .toPromise()
        .then(response => response.json().hero as Hero)
        .catch(this.handleError);
    } else {
      return Promise.reject("not logged in")
        .then()
        .catch(this.handleError);
    }
  }

  handleError(error: any) {
    console.error('An error occurred', error);
    this.sessions.emitAuthStatus(null);
    return Promise.reject(error.message || error);
  }

  private post(hero: Hero): Promise<Hero> {
    let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
    return this.http.post(`${this.baseUrl}/heros`, JSON.stringify(hero), options)
      .toPromise().then(res => res.json().hero as Hero)
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero) {
    let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
    let url = `${this.baseUrl}/heros/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), options)
      .toPromise()
      .then((res) => res.json().hero as Hero)
      .catch(this.handleError);
  }

  delete(id: number) {
    let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
    let url = `${this.baseUrl}/heros/${id}`;

    return this.http
      .delete(url, options)
      .toPromise()
      .catch(this.handleError);
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

}
