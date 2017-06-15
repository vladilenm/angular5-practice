import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventsService } from '../shared/services/events.serrvice';
import { Event } from '../shared/models/event.model';
import { Observable } from 'rxjs/Observable';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/categiry.model';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryPageComponent implements OnInit {
  events: Event[] = [];
  categories: Category[] = [];
  chartData: { name: string, value: number }[] = [];

  isLoaded = false;

  constructor(private eventsService: EventsService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    Observable.combineLatest(
      this.eventsService.getEvents(),
      this.categoriesService.getCategories()
    ).subscribe((data: [Event[], Category[]]) => {
      this.events = data[0];
      this.categories = data[1];
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData() {
    this.categories.forEach((cat) => {
      const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, event) => {
          total += event.amount;
          return total;
        }, 0)
      });
    });
  }

}
