// import * as PadActions from '../actions/pad.actions';
import { PadActions, PadActionTypes } from '../actions/pad.actions';

export interface State {
  P: number;
  A: number;
  D: number;
  isEmoting: boolean;
}
// isEmoting state is experimental - not sure when/if to use?

const initialState: State = {
  P: 0,
  A: 0,
  D: 0,
  isEmoting: false
};

export function reducer(state = initialState, action: PadActions): State {
  switch (action.type) {

    case PadActionTypes.ChangeP: {
      return {
        ...state,
        P: action.payload,
        isEmoting: true
      };
    }

    case PadActionTypes.ChangeA: {
      return {
        ...state,
        A: action.payload,
        isEmoting: true
      };
    }

  case PadActionTypes.ChangeD: {
      return {
        ...state,
        D: action.payload,
        isEmoting: true
      };
    }

    case PadActionTypes.Reset: {
      return {
        ...state,
        P: 0,
        A: 0,
        D: 0,
        isEmoting: false
      };
    }

    default:
      return state;
  }
}

export const getP = (state: State) => state.P;
export const getA = (state: State) => state.A;
export const getD = (state: State) => state.D;
export const getIsEmoting = (state: State) => state.isEmoting;
