import { createAction, props } from '@ngrx/store';

export const changeP = createAction(
  '[PAD emoviz] Change Pleasure',
  props<{pleasure: number}>()
);

export const changeA = createAction(
  '[PAD emoviz] Change Arousal',
  props<{arousal: number}>()
);

export const changeD = createAction(
  '[PAD emoviz] Change Dominance',
  props<{dominance: number}>()
);

export const reset = createAction(
  '[PAD emoviz] Reset'
);

// TODO: Below is old NGRX way for TEMPORARY reference only

// export enum PadActionTypes {
//   ChangeP = '[PAD emoviz] Change P',
//   ChangeA = '[PAD emoviz] Change A',
//   ChangeD = '[PAD emoviz] Change D',
//   Reset = '[PAD emoviz] Reset',
// }

// export class ChangeP implements Action {
//   readonly type = PadActionTypes.ChangeP;

//   constructor(public payload: number) {}
// }

// export class ChangeA implements Action {
//   readonly type = PadActionTypes.ChangeA;

//   constructor(public payload: number) {}
// }

// export class ChangeD implements Action {
//   readonly type = PadActionTypes.ChangeD;

//   constructor(public payload: number) {}
// }

// export class Reset implements Action {
//   readonly type = PadActionTypes.Reset;
// }

// export type PadActions =
//   | ChangeP
//   | ChangeA
//   | ChangeD
//   | Reset
//   ;
