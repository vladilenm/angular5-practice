import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency;

  euro: Bill = {value: 0, currency: 'EUR'};
  dollar: Bill = {value: 0, currency: 'USD'};

  ngOnInit() {
    this.euro.value = this.currency.rates[this.euro.currency] * this.bill.value;
    this.dollar.value = this.currency.rates[this.dollar.currency] * this.bill.value;
  }

}
