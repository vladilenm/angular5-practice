import { Component, Input } from '@angular/core';

@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {
  @Input() currency;
  currencies = ['USD', 'EUR'];
}
