import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  bill: Bill;
  currency;
  isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.billService.getBillValue(),
      this.billService.getCurrency()
    ).subscribe((data) => {
      this.isLoaded = true;
      this.bill = data[0];
      this.currency = data[1];
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.billService.getCurrency().delay(2000).subscribe((currency) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
