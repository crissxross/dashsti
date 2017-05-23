import { Action } from '@ngrx/store';

export const CHANGE_P = '[PAD] Change P';
export const CHANGE_A = '[PAD] Change A';
export const CHANGE_D = '[PAD] Change D';
export const RESET = '[PAD] Reset';


export class ChangeP implements Action {
  readonly type = CHANGE_P;

  constructor(public payload: number) {}
}

export class ChangeA implements Action {
  readonly type = CHANGE_A;

  constructor(public payload: number) {}
}

export class ChangeD implements Action {
  readonly type = CHANGE_D;

  constructor(public payload: number) {}
}

export class Reset implements Action {
  readonly type = RESET;
}

export type All
  = ChangeP
  | ChangeA
  | ChangeD
  | Reset;
