import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any): String {
    return value.toString().charAt(0).toUpperCase() + value.toString().toLowerCase().slice(1);
  }
}
