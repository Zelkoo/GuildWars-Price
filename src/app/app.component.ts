import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, Output} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe, NgIf} from "@angular/common";
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
import {DateConverterService} from "./services/date-converter.service";
import {ConvertedData} from "./shared/interfaces/interface";
import {Observable, Subscription, take} from "rxjs";
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
import { Store} from "@ngrx/store";
import { loadPriceHistory} from "./store/price-history.actions";
import {CommonMaterial, RareMaterial} from "./shared/enums/enums";
import {ChartComponentComponent} from "./chart-component/chart-component.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,
    NgIf, MatDateRangeInput, MatLabel, MatFormField, MatDatepickerToggle, MatDateRangePicker, MatFormFieldModule, MatDatepickerModule, MatListItem, MatList, MaterialsListComponent, RemoveUnderscorePipe, MatRow, MatHeaderRow, MatCell, MatHeaderCell, MatColumnDef, MatTable, MatHeaderCellDef, MatCellDef, MatRowDef, MatHeaderRowDef, AsyncPipe, ChartComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideNativeDateAdapter(), RemoveUnderscorePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy{
  private subscription!: Subscription;
  public priceHistory$!: Observable<ConvertedData[]>;
  public idItem!: string;
  public selectedItem!: string;
  public priceHistory!: ConvertedData[];
  @Output() public itemData: any;

  constructor(private dateConverter: DateConverterService, private store: Store) {
    this.priceHistory$ = this.store.select((state: any) => state.priceHistory.data);
  }

  public ngOnInit(): void {
    this.dispatchAllMaterialItems()
  }

  onItemSelected(item: {name: string, id: string}) {
    this.selectedItem = item.name;
    this.idItem = item.id;
    this.displayChartWithSelectedItem(item.id);
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public displayChartWithSelectedItem(itemId: string) {
    this.priceHistory$.pipe(take(1)).subscribe(priceHistoryState => {
      this.itemData = priceHistoryState[Number(itemId)] || [];
    });
  }

  public dispatchAllMaterialItems(): void {
    const rareMaterialKeys = Object.values(RareMaterial);
    const commmonMaterialKeys = Object.values(CommonMaterial);
    const start = this.dateConverter.calculateOneMonthFromCurrentDate();
    const end = this.dateConverter.convertDateToTimestamp(new Date());

    rareMaterialKeys.forEach((itemId: string) => {
      this.store.dispatch(loadPriceHistory({ itemId, start, end }));
    })
    commmonMaterialKeys.forEach((itemId: string) => {
      this.store.dispatch(loadPriceHistory({ itemId, start, end }));
    })
  }
}

