import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date) {
    const day: string = value.getDate().toString().padStart(2, "0");
    const month: string = (value.getMonth() + 1).toString().padStart(2, "0");
    const year: string = value.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }
}
