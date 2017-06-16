import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wfmFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], value: string, field: string) {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter((i) => {
      const t = Object.assign({}, i);
      if (!isNaN(t[field])) {
        t[field] = t[field] + '';
      }
      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'Доход' : 'Расход';
      }
      if (field === 'category') {
        t[field] = t['categoryName'];
      }
      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
