import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  constructor() { }

  public convertDateToTimestamp(date: Date): number {
    return Math.floor(new Date(date).getTime() / 1000);
  }

  public convertTimestampToDate(timestamp: number): string | undefined {
    if (typeof timestamp === 'undefined') {
      return
    }
    if (timestamp.toString().length === 10) {
      timestamp *= 1000;
    }
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
