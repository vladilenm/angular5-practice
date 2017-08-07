import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../models/event.model';
import { BaseApi } from '../../../shared/core/base-api.service';
import * as moment from 'moment';

@Injectable()
export class EventsService extends BaseApi {

  private events: Event[] = [
    {
      'id': 1,
      'type': 'income',
      'amount': 1250,
      'category': 2,
      'date': moment().format('DD.MM.YYYY HH:mm:ss'),
      'description': 'Подарили еду в гостях'
    },
    {
      'id': 2,
      'type': 'outcome',
      'amount': 1300,
      'category': 1,
      'date': moment().add(1, 'day').format('DD.MM.YYYY HH:mm:ss'),
      'description': 'Купил посудомоечную машину'
    },
    {
      'type': 'income',
      'amount': 1480,
      'category': 2,
      'date': moment().subtract(1, 'day').format('DD.MM.YYYY HH:mm:ss'),
      'id': 3,
      'description': 'Поход в окей с баллами. Бесплатная еда'
    },
    {
      'type': 'outcome',
      'amount': 2470,
      'category': 2,
      'date': moment().add(4, 'h').format('DD.MM.YYYY HH:mm:ss'),
      'id': 4,
      'description': 'Закупка на неделю'
    },
    {
      'type': 'outcome',
      'amount': 4000,
      'category': 3,
      'date': moment().subtract(4, 'h').format('DD.MM.YYYY HH:mm:ss'),
      'id': 5,
      'description': 'Заправка + проход ТО'
    }
  ];

  private idCount = 5;


  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: Event): Observable<Event> {
    event.id = ++this.idCount;
    this.events.push(event);
    return Observable.of(event);
  }

  getEvents(): Observable<Event[]> {
    return Observable.of(this.events.slice());
  }

  getEventById(id: string): Observable<Event> {
    return Observable.of(this.events.find(e => e.id === +id));
  }
}
