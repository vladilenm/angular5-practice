import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api.service';

@Injectable()
export class BillService extends BaseApi {
  private bill: Bill = {
    value: 100000,
    currency: 'RUB'
  };

  constructor(public http: Http) {
    super(http);
  }

  getBillValue(): Observable<Bill> {
    return Observable.of(this.bill);
  }

  updateBill(bill: Bill): Observable<Bill> {
    bill.value = +bill.value;
    this.bill = bill;
    return Observable.of(this.bill);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`http://api.fixer.io/latest?base=${base}`)
      .map((response: Response) => response.json());
  }
}
