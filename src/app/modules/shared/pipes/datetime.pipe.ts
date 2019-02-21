import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DateTimePipe implements PipeTransform  {
  transform(value) {
    const seperate = value.replace('.000Z', '').split('T'),
    date = seperate[0].split('-'),
    time = seperate[1].split(':');
    return `${date.reverse().join('.')} ${time[0]}:${time[1]}`;
  }
}
