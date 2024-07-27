import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GetPriceServiceService} from "./get-price-service.service";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
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
import {Observable, Subscription} from "rxjs";
import {MaterialsListComponent} from "./materials-list/materials-list/materials-list.component";
import {RemoveUnderscorePipe} from "./shared/pipe/remove-underscore";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {select, Store} from "@ngrx/store";
import {AppState, loadPriceHistory} from "./store/price-history.actions";
import {selectPriceHistory} from "./store/price-history.selectors";
import {RareMaterial} from "./shared/enums/enums";
import {PriceEntry, PriceHistoryState} from "./store/price-history.reducer";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,
    NgIf, MatDateRangeInput, MatLabel, MatFormField, MatDatepickerToggle, MatDateRangePicker, MatFormFieldModule, MatDatepickerModule, MatListItem, MatList, MaterialsListComponent, RemoveUnderscorePipe, MatRow, MatHeaderRow, MatCell, MatHeaderCell, MatColumnDef, MatTable, MatHeaderCellDef, MatCellDef, MatRowDef, MatHeaderRowDef, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideNativeDateAdapter(), RemoveUnderscorePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AppComponent implements OnInit, OnDestroy{
  private subscription!: Subscription;
  public priceHistory$!: Observable<any>;
  public startDate!: Date;
  public endDate!: Date;
  public startDateTimestamp!: number;
  public endDateTimestamp!: number;
  public idItem!: string;
  public selectedItem!: string;
  public dataSource!: ConvertedData[];
  displayedColumns: string[] = ['demo-id', 'demo-price', 'demo-date'];
  loading$: Observable<boolean>;
  error$: Observable<any>;
  public dataDummy: any;
  constructor(private priceHistoryService: GetPriceServiceService, private dateConverter: DateConverterService, private store: Store) {
    this.priceHistory$ = this.store.select((state: any) => state.priceHistory.data);
    // @ts-ignore
    this.loading$ = this.store.select(state => state.priceHistory.loading);// @ts-ignore
    this.error$ = this.store.select(state => state.priceHistory.error);
  }

  public ngOnInit(): void {
    const keys = Object.values(RareMaterial)
    const start = 1720088000000;
    const end = 1721088000000;

    keys.forEach((itemId: string) => {
      this.store.dispatch(loadPriceHistory({ itemId, start, end }));// @ts-ignore
    })
  }


  onItemSelected(item: {name: string, id: string}) {
    this.selectedItem = item.name;
    this.idItem = item.id;
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getPriceHistory(): void {
    const start = 1720088000000;
    const end = 1721088000000;
    const itemId = '930'
    this.priceHistory$.subscribe(data => {
      console.log(data);
      // this.store.dispatch(logData({ selectedData: data }));
    });    // const priceHistorySelector = selectPriceHistory(itemId, start, end);
    // this.store.pipe(select(priceHistorySelector as any)).subscribe((priceHistory: any) => {
    //   console.log(priceHistory);
    // });


    // if (this.startDate) {
    //   this.startDateTimestamp = this.dateConverter.convertDateToTimestamp(this.startDate);
    // }
    //
    // if (this.endDate) {
    //   this.endDateTimestamp = this.dateConverter.convertDateToTimestamp(this.endDate);
    // }

    // this.subscription = this.priceHistoryService.getPriceHistory(this.startDateTimestamp, this.endDateTimestamp, this.idItem).subscribe(data => {
    //   this.priceHistory = data.map((item: any) => ({
    //     id: item.m,
    //     price: item.p,
    //     date: this.dateConverter.convertTimestampToDate(item.t)
    //   }));;
    //   this.dataSource = this.priceHistory
    // });
  }


}

