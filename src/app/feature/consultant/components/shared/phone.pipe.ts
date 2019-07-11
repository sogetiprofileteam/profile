import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phone'})
export class phonePipe implements PipeTransform {
  transform(value: number): string {
      let phoneNumber = value.toString()
      let areaCode = phoneNumber.slice(0,3)
      let prefix = phoneNumber.slice(3,6)
      let lineNumber = phoneNumber.slice(6);
    return "(" + areaCode + ") " + prefix + "-" + lineNumber
  }
}