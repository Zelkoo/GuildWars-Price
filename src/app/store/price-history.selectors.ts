import { createSelector } from '@ngrx/store';
import {AppState} from "./price-history.actions";

export const selectPriceHistoryState = (state: AppState) => state.priceHistory;

export const selectPriceHistory = (itemId: string, start: number, end: number) => createSelector(
  selectPriceHistoryState,
  (priceHistoryState) => priceHistoryState.data[itemId] || []
);
