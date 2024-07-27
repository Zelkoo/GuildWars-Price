import {createAction, props} from "@ngrx/store";
import {PriceHistoryState} from "./price-history.reducer";
export interface AppState {
  priceHistory: PriceHistoryState;
}
export const loadPriceHistory = createAction(
  '[Price History] Load Price History',
  props<{ itemId: string, start: number, end: number }>()
);

export const loadPriceHistorySuccess = createAction(
  '[Price History] Load Price History Success',
  props<{ itemId: string, start: number, end: number, data: any[] }>()
);

export const loadPriceHistoryFailure = createAction(
  '[Price History] Load Price History Failure',
  props<{ itemId: string, start: number, end: number, error: any }>()
);
