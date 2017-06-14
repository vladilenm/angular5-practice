import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../models/event.model';
import { BaseApi } from '../../../shared/core/base-api.service';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: Event): Observable<Event> {
    return this.post('events', event);
  }

  getEvents(): Observable<Event[]> {
    return this.get('events');
  }
}
