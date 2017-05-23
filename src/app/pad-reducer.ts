import * as PadActions from './pad-actions';

export interface State {
  P: number;
  A: number;
  D: number;
}

const initialState: State = {
  P: 0,
  A: 0,
  D: 0
};

export function reducer(state = initialState, action: PadActions.All): State {
  switch (action.type) {
    case PadActions.CHANGE_P: {
      return {
        ...state,
        P: action.payload
      };
    }

    case PadActions.CHANGE_A: {
      return {
        ...state,
        A: action.payload
      };
    }

  case PadActions.CHANGE_D: {
      return {
        ...state,
        D: action.payload
      };
    }

    case PadActions.RESET: {
      return {
        ...state,
        P: 0,
        A: 0,
        D: 0,
      };
    }

    default: {
      return state;
    }

  }
}
