import { Action } from '@ngrx/store';

// export const CHANGE_P = '[PAD] Change P';
// export const CHANGE_A = '[PAD] Change A';
// export const CHANGE_D = '[PAD] Change D';
// export const RESET = '[PAD] Reset';

export enum PadActionTypes {
  ChangeP = '[PAD emoviz] Change P',
  ChangeA = '[PAD emoviz] Change A',
  ChangeD = '[PAD emoviz] Change D',
  Reset = '[PAD emoviz] Reset',
}

export class ChangeP implements Action {
  readonly type = PadActionTypes.ChangeP;

  constructor(public payload: number) {}
}

export class ChangeA implements Action {
  readonly type = PadActionTypes.ChangeA;

  constructor(public payload: number) {}
}

export class ChangeD implements Action {
  readonly type = PadActionTypes.ChangeD;

  constructor(public payload: number) {}
}

export class Reset implements Action {
  readonly type = PadActionTypes.Reset;
}

export type PadActions =
  | ChangeP
  | ChangeA
  | ChangeD
  | Reset
  ;
