import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { Category } from '../../shared/models/categiry.model';
import { NgForm } from '@angular/forms';
import { EventsService } from '../../shared/services/events.serrvice';
import { Event } from '../../shared/models/event.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {
  @Input() categories: Category[] = [];

  types = [
    {label: 'Доход', value: 'income'},
    {label: 'Расход', value: 'outcome'}
  ];

  constructor(private eventsService: EventsService) {
  }

  onSubmit(form: NgForm) {
    const {category, type, amount} = form.value;
    const event = new Event(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'));
    this.eventsService.addEvent(event)
      .subscribe(() => {
        form.setValue({category: 1, type: 'outcome', amount: 1});
      });
  }

}
