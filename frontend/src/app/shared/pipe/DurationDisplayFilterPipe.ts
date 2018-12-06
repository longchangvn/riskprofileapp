import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
  name: 'durationdisplay'
})
export class DurationDisplayPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }
  transform(created: Date): string {
    if (!created)
      return "";
    if (typeof (created) == "string")
      created = new Date(created);
    const currentDate = new Date();
    const duration = (currentDate.valueOf() - created.valueOf());
    const diffDays = Math.floor(duration / 86400000); // days
    const diffHrs = Math.floor((duration % 86400000) / 3600000); // hours
    const diffMins = Math.round(((duration % 86400000) % 3600000) / 60000) // mins
    const month = currentDate.getMonth() - created.getMonth();
    const year = currentDate.getFullYear() - created.getFullYear();

    const dayinMonth = this.daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const createdFormated = new DatePipe(this.translateService.currentLang).transform(created, "yyyy-MM-dd hh:mm:ss")

    if (diffMins < 1)
      return `a min ago (${createdFormated})`;
    if (diffMins > 1 && diffMins < 60)
      return `${diffMins} mins ago (${createdFormated})`;

    if (diffHrs < 1)
      return `a hour ago (${createdFormated})`;
    if (diffHrs > 1 && diffHrs < 24)
      return `${diffHrs} hours ago (${createdFormated})`;

    if (diffDays < 1)
      return `a day ago (${createdFormated})`;
    if (diffDays > 1 && diffDays < dayinMonth)
      return `${diffDays} days ago (${createdFormated})`;

    if (month < 1)
      return `a month ago (${createdFormated})`;
    if (month > 1 && month < 12)
      return `${month} month ago (${createdFormated})`;

    if (year < 1)
      return `a year ago (${createdFormated})`;
    if (year > 1)
      return `${year} years ago (${createdFormated})`;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

}