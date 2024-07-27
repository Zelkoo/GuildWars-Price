import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as PriceHistoryActions from './price-history.actions'
import {DateConverterService} from "../shared/date-converter.service";

@Injectable()
export class PriceHistoryEffects {
  loadPriceHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PriceHistoryActions.loadPriceHistory),
      mergeMap(action =>
        this.http.get<any[]>(`/api/pricing_history/${action.itemId}/${action.start}/${action.end}`).pipe(
          map(data => data.map(item => ({
            id: item.m,
            price: item.p,
            date: this.dateConvert.convertTimestampToDate(item.t)
          }))),
          map(transformedData => PriceHistoryActions.loadPriceHistorySuccess({ itemId: action.itemId, start: action.start, end: action.end, data: transformedData })),
          catchError(error => of(PriceHistoryActions.loadPriceHistoryFailure({ itemId: action.itemId, start: action.start, end: action.end, error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private dateConvert: DateConverterService
  ) {}
}
