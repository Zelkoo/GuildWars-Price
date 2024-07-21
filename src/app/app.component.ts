import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GetPriceServiceService} from "./get-price-service.service";
import {HttpClientModule} from "@angular/common/http";
import {JsonPipe, NgIf} from "@angular/common";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {provideNativeDateAdapter} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {MatList, MatListItem} from "@angular/material/list";
import {DateConverterService} from "./shared/date-converter.service";
import {ConvertedData} from "./shared/interfaces/interface";
import {Subscription} from "rxjs";
import {RareMaterial} from "./shared/enums/enums";
import {MaterialsListComponent} from "./materials-list/materials-list/materials-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, JsonPipe, NgIf, MatDateRangeInput, MatLabel, MatFormField, MatDatepickerToggle, MatDateRangePicker, MatFormFieldModule, MatDatepickerModule, MatListItem, MatList, MaterialsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AppComponent implements OnInit, OnDestroy{
  private subscription!: Subscription;
  public priceHistory!: ConvertedData[];
  public startDate!: Date;
  public endDate!: Date;
  public startDateTimestamp!: number;
  public endDateTimestamp!: number;
  selectedItem!: string;

  constructor(private priceHistoryService: GetPriceServiceService, private dateConverter: DateConverterService) {}

  public ngOnInit(): void {

  }


  onItemSelected(item: string) {
    this.selectedItem = item;
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getPriceHistory(): void {
    if (this.startDate) {
      this.startDateTimestamp = this.dateConverter.convertDateToTimestamp(this.startDate);
    }

    if (this.endDate) {
      this.endDateTimestamp = this.dateConverter.convertDateToTimestamp(this.endDate);
    }

    this.subscription = this.priceHistoryService.getPriceHistory(this.startDateTimestamp, this.endDateTimestamp, RareMaterial.GLOB_OF_ECTOPLASM).subscribe(data => {
      this.priceHistory = data.map((item: any) => ({
        id: item.m,
        price: item.p,
        date: this.dateConverter.convertTimestampToDate(item.t)
      }));;
    });
  }


}

