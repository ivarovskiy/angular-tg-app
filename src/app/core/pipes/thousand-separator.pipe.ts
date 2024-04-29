import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator',
  standalone: true,
})
export class ThousandSeparatorPipe implements PipeTransform {
  transform(value: number | string, locale: string = 'fr-FR'): string {
    const numberValue = parseFloat(value.toString());
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      useGrouping: true,
    }).format(numberValue);
  }
}
