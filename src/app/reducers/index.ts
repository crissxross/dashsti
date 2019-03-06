import * as fromPad from './pad.reducer';

export interface State {
  pad: fromPad.State;
}

export const reducers = {
  pad: fromPad.reducer
};
