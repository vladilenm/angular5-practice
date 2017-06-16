import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventsService } from '../shared/services/events.serrvice';
import { Event } from '../shared/models/event.model';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
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
  chartData = [];

  filteredEvents: Event[] = [];

  isFilterVisible = false;
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

      this.setOriginalEvents();
      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  calculateChartData() {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.filteredEvents.filter(e => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, event) => {
          total += event.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterModal(dir: boolean) {
    this.isFilterVisible = dir;
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  openFilter() {
    this.toggleFilterModal(true);
  }

  onFilterClose() {
    this.toggleFilterModal(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  onFilterApply(filterData) {
    this.toggleFilterModal(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();

  }

}
