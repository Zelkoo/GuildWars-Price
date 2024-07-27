import { createReducer, on } from '@ngrx/store';
import * as PriceHistoryActions from './price-history.actions'
export interface PriceEntry {
  id: string;
  price: number;
  date: string;
}

export interface PriceHistoryState {
  data: {
    [itemId: string]: PriceEntry[];
  };
  loading: boolean;
  error: any;
}

export const initialState: PriceHistoryState = {
  data: {},
  loading: false,
  error: null
};

const _priceHistoryReducer = createReducer(
  initialState,
  on(PriceHistoryActions.loadPriceHistory, (state) => ({ ...state, loading: true })),
  on(PriceHistoryActions.loadPriceHistorySuccess, (state, { itemId, start, end, data }) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      [itemId]: [
        ...state.data[itemId] || [],
        ...data
      ]
    }
  })),
  on(PriceHistoryActions.loadPriceHistoryFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function priceHistoryReducer(state: any, action: any) {
  return _priceHistoryReducer(state, action);
}
