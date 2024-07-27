import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscores',
  standalone: true
})
export class RemoveUnderscoresPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/_/g, '');
  }
}
