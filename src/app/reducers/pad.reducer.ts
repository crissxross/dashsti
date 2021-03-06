import { Action, createReducer, on } from '@ngrx/store';
import * as PadActions from '../actions/pad.actions';
// import { PadActions, PadActionTypes } from '../actions/pad.actions';

export interface PadState {
  P: number;
  A: number;
  D: number;
  isEmoting: boolean;
}
// isEmoting state is experimental - not sure when/if to use?

const initialState: PadState = {
  P: 0,
  A: 0,
  D: 0,
  isEmoting: false
};

const padReducer = createReducer(
  initialState,
  on(PadActions.changeP, (state, {pleasure}) => ({
    ...state,
    P: pleasure,
    isEmoting: true,
  })),
  on(PadActions.changeA, (state, {arousal}) => ({
    ...state,
    A: arousal,
    isEmoting: true,
  })),
  on(PadActions.changeD, (state, {dominance}) => ({
    ...state,
    D: dominance,
    isEmoting: true,
  })),
  on(PadActions.reset, state => ({
    ...state,
    P: 0,
    A: 0,
    D: 0,
    isEmoting: false
  }))
);

// Note: The exported reducer function (below) is necessary as function calls are not supported by the AOT compiler.
// see - https://next.ngrx.io/guide/store/reducers

export function reducer(state: PadState | undefined, action: Action) {
  return padReducer(state, action);
}

export const getP = (state: PadState) => state.P;
export const getA = (state: PadState) => state.A;
export const getD = (state: PadState) => state.D;
export const getIsEmoting = (state: PadState) => state.isEmoting;

// TODO: Below is old NGRX way for TEMPORARY reference only

// export function reducer(state = initialState, action: PadActions): State {
//   switch (action.type) {

//     case PadActionTypes.ChangeP: {
//       return {
//         ...state,
//         P: action.payload,
//         isEmoting: true
//       };
//     }

//     case PadActionTypes.ChangeA: {
//       return {
//         ...state,
//         A: action.payload,
//         isEmoting: true
//       };
//     }

//   case PadActionTypes.ChangeD: {
//       return {
//         ...state,
//         D: action.payload,
//         isEmoting: true
//       };
//     }

//     case PadActionTypes.Reset: {
//       return {
//         ...state,
//         P: 0,
//         A: 0,
//         D: 0,
//         isEmoting: false
//       };
//     }

//     default:
//       return state;
//   }
// }
