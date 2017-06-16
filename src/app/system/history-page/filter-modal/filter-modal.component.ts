import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../shared/models/categiry.model';

@Component({
  selector: 'wfm-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent {
  @Input() categories: Category[];

  @Output() onSuccess = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCats = [];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'm', label: 'Месяц'}
  ];

  handleChangeType({checked, value}: any) {
    this.calculateSelectedValueFor('selectedTypes', checked, value);
  }

  handleChangeCat({checked, value}: any) {
    this.calculateSelectedValueFor('selectedCats', checked, value);
  }

  private calculateSelectedValueFor(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  onApply() {
    this.onSuccess.emit({
      types: this.selectedTypes,
      categories: this.selectedCats,
      period: this.selectedPeriod
    });
  }

  onDissmiss() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCats = [];
    this.onCancel.emit();
  }

}
