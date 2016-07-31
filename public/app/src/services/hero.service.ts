import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from '../models/hero';
import { SessionsService } from './sessions.service';
import { Locker } from 'angular2-locker';

@Injectable()
export class HeroService {
  private baseUrl = 'http://localhost:3000'; // URL to web API

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
      return Promise.reject("not logged in");
    }
  }

  getHeroes() {
    return this.http.get(this.baseUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  // getHeroesSlowly() {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(() => resolve(HEROES), 2000)
  //   );
  // }

  getHero(id: number) {
    return this.getHeroes().then(
      (heroes) => heroes.find(hero => hero.id === id)
    );
  }

  handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl, JSON.stringify(hero), { headers: headers })
      .toPromise().then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.baseUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.baseUrl}/${hero.id}`;

    return this.http
      .delete(url, { headers: headers })
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
