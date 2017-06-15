import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/categiry.model';
import { EventsService } from '../../shared/services/events.serrvice';
import { Event } from '../../shared/models/event.model';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {
  @Input() categories: Category[] = [];

  billError: string;

  types = [
    {label: 'Доход', value: 'income'},
    {label: 'Расход', value: 'outcome'}
  ];

  constructor(private eventsService: EventsService,
              private billService: BillService) {
  }

  onSubmit(form: NgForm) {
    const {category, type, amount} = form.value;
    const event = new Event(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'));
    this.billService.getBillValue()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (bill.value < amount) {
            this.billError = `Недостаточно средств - не хватает ${(bill.value - amount) * -1}`;
            return;
          } else {
            this.billError = '';
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
        this.billService.updateBill({value, currency: bill.currency})
          .mergeMap(() => this.eventsService.addEvent(event))
          .subscribe(() => {
            form.setValue({category: 1, type: 'outcome', amount: 1});
          });
      });
  }
}
