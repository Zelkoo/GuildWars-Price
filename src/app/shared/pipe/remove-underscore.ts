import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'removeUnderscoresPipe',
  standalone: true
})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: string): any {
    return value.replace(/_/g, ' ')
  }
}
