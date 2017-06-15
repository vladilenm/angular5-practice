import { Component, Input } from '@angular/core';

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
  @Input() data;
  colorScheme = {
    domain: ['#52BCD3', '#2DB2DF', '#85D2ED']
  };
}
