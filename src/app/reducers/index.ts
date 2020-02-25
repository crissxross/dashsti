import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromPad from './pad.reducer';

export interface State {
  pad: fromPad.PadState;
}

export const reducers: ActionReducerMap<State> = {
  pad: fromPad.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getPadFeatureState = createFeatureSelector<fromPad.PadState>(
  'pad',
);

export const getP = createSelector(
  getPadFeatureState,
  fromPad.getP,
);

export const getA = createSelector(
  getPadFeatureState,
  fromPad.getA,
);

export const getD = createSelector(
  getPadFeatureState,
  fromPad.getD,
);

export const getIsEmoting = createSelector(
  getPadFeatureState,
  fromPad.getIsEmoting,
);
