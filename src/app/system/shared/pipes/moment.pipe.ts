import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'wfmMoment'
})
export class MomentPipe implements PipeTransform {
  transform(value: string, format: string, toFormat: string): string {
    return moment(value, format).format(toFormat);
  }
}
