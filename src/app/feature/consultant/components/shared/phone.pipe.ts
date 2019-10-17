import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phone'})

export class PhonePipe implements PipeTransform {
  transform(value: number): string {
      const phoneNumber = value.toString()
      const areaCode = phoneNumber.slice(0,3)
      const prefix = phoneNumber.slice(3,6)
      const lineNumber = phoneNumber.slice(6);
    return "(" + areaCode + ") " + prefix + "-" + lineNumber
  }
}
