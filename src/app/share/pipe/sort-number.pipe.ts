import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNumber'
})
export class SortNumberPipe implements PipeTransform {

  transform(arrNumber: number[], args: any): any {
arrNumber.sort((a,b) => {
if(a>b) return args;
else if (a<b) return -args;
else return 0;
}) 

return [...arrNumber]
}

}
