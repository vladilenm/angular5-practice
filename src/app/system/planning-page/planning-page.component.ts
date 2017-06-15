import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CategoriesService } from '../shared/services/categories.service';
import { BillService } from '../shared/services/bill.service';
import { EventsService } from '../shared/services/events.serrvice';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/categiry.model';
import { Event } from '../shared/models/event.model';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {
  bill: Bill;
  isLoaded = false;
  categories: Category[] = [];
  events: Event[] = [];

  constructor(private categoriesService: CategoriesService,
              private billService: BillService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    Observable.combineLatest(
      this.billService.getBillValue(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((combined: [Bill, Category[], Event[]]) => {
      this.bill = combined[0];
      this.categories = combined[1];
      this.events = combined[2];
      this.setCostsToCategories();

      this.isLoaded = true;
    });
  }

  setCostsToCategories() {
    this.categories.forEach((cat) => {
      const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
      cat.costs = catEvents.reduce((total, event) => {
        total += event.amount;
        return total;
      }, 0);
    });
  }

  getCatCostsPercent(cat: Category): string {
    const percent = (100 * cat.costs / cat.capacity);
    const savePercent = percent > 100 ? 100 : percent;
    return savePercent + '%';
  }

  getCostColorClass(cat: Category): string {
    const percent = (100 * cat.costs / cat.capacity);
    const percentType = percent < 60 ? 's' : percent < 100 ? 'w' : 'd';
    const classes = {'s': 'success', 'd': 'danger', 'w': 'warning'};
    return classes[percentType];
  }
}
