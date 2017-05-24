import * as PadActions from './pad-actions';

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

export function reducer(state = initialState, action: PadActions.All): State {
  switch (action.type) {
    case PadActions.CHANGE_P: {
      return {
        ...state,
        P: action.payload,
        isEmoting: true
      };
    }

    case PadActions.CHANGE_A: {
      return {
        ...state,
        A: action.payload,
        isEmoting: true
      };
    }

  case PadActions.CHANGE_D: {
      return {
        ...state,
        D: action.payload,
        isEmoting: true
      };
    }

    case PadActions.RESET: {
      return {
        ...state,
        P: 0,
        A: 0,
        D: 0,
        isEmoting: false
      };
    }

    default: {
      return state;
    }

  }
}
