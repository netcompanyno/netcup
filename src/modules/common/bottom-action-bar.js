import { APP } from '../../constants';

const SWITCH_TAB = `${APP}/bottomNavigationBar/SWITCH_TAB`;

const defaultState = {
  index: 0,
};

export const switchTab = index => ({ type: SWITCH_TAB, value: index });

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SWITCH_TAB: {
      return { ...state, index: action.value };
    }
    default: return state;
  }
}
