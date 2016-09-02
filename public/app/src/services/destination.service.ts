import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Locker } from 'angular2-locker';

import { SessionsService } from './sessions.service';
import { Destination } from '../models/destination';

@Injectable()
export class DestinationService {
  private baseUrl = 'http://localhost:3001'; // URL to web API
  private continents = [
    'Africa',
    'Antarctica',
    'Asia',
    'Australia',
    'Europe',
    'North America',
    'South America'
  ]

  constructor(
    private http: Http,
    private locker: Locker,
    private sessions: SessionsService
  ) { }

  getTopDestinations() {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/top_destinations`, options)
        .toPromise()
        .then(res => res.json().destinations as Destination[])
        .catch(this.handleError);
    } else {
      return Promise.reject("not logged in")
        .then()
        .catch(this.handleError);
    }
  }

  getAllDestinations() {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/all_destinations`, options)
        .toPromise()
        .then(response => response.json().destinations as Destination[])
        .catch(this.handleError);
    } else {
      return Promise.reject("not logged in")
        .then()
        .catch(this.handleError);
    }
  }

  getUserDestinations() {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/destinations`, options)
        .toPromise()
        .then(response => response.json().destinations as Destination[])
        .catch(this.handleError);
    } else {
      return Promise.reject("not logged in")
        .then()
        .catch(this.handleError);
    }
  }

  getContinents() {
    return Promise.resolve(this.continents).then(
      response => response as string[]
    )
  }

  getDestination(id: number) {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/destinations/${id}`, options)
        .toPromise()
        .then(response => response.json().destination as Destination)
        .catch(this.handleError);
    } else {
      return Promise.reject("not logged in")
        .then()
        .catch(this.handleError);
    }
  }

  getDestinationOverview() {
    if (this.locker.has('currentUser')) {
      let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
      return this.http.get(`${this.baseUrl}/destinations_overview`, options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    } else {
      return Promise.reject("couldn't get overview")
        .then()
        .catch(this.handleError);
    }
  }

  handleError(error: any) {
    console.error('An error occurred', error);
    this.sessions.emitAuthStatus(null);
    return Promise.reject(error.message || error);
  }

  private post(destination: Destination): Promise<Destination> {
    let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
    return this.http.post(`${this.baseUrl}/destinations`, JSON.stringify(destination), options)
      .toPromise().then(res => res.json().destination as Destination)
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(destination: Destination) {
    let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
    let url = `${this.baseUrl}/destinations/${destination.id}`;

    return this.http
      .put(url, JSON.stringify(destination), options)
      .toPromise()
      .then((res) => res.json().destination as Destination)
      .catch(this.handleError);
  }

  delete(id: number) {
    let options = new RequestOptions({ headers: this.locker.get('currentUser').authHeaders });
    let url = `${this.baseUrl}/destinations/${id}`;

    return this.http
      .delete(url, options)
      .toPromise()
      .catch(this.handleError);
  }

  save(destination: Destination): Promise<Destination> {
    if (destination.id) {
      return this.put(destination);
    }
    return this.post(destination);
  }
}
