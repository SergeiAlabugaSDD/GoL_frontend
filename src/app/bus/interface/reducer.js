import { createReducer } from '@reduxjs/toolkit';

// actions
import { actions } from './actions';

let innerWidth;
let innerHeight;

if (window) {
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
}

const initialState = {
  userView: {
    innerWidth,
    innerHeight,
  },
  buttonOK: {
    top: 20,
    left: 20,
  },
  rangeBorn: {
    top: 60,
    left: 20,
    value: 2,
  },
  resizeble: {
    isStartResizing: false,
    width: 70 * (innerWidth / 100),
  },
};

export const interfaceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.moveItemOfInterface, (state, { payload }) => {
      state[payload.id] = { top: payload.top, left: payload.left };
    })
    .addCase(actions.moveResizeble, (state, { payload }) => {
      const viewWidth = (payload / innerWidth) * 100;
      if (viewWidth > 80 || viewWidth < 40) {
        return;
      }
      state.resizeble = { ...state.resizeble, width: payload };
    })
    .addCase(actions.startResizing, (state) => {
      state.resizeble = {
        ...state.resizeble,
        isStartResizing: true,
      };
    })
    .addCase(actions.endResizing, (state) => {
      state.resizeble = {
        ...state.resizeble,
        isStartResizing: false,
      };
    })
    .addDefaultCase((state) => state);
});

// selectors
export const interfaceSelectors = {
  getInterface: (state) => state.userInterface,
  getResizeble: (state) => state.userInterface.resizeble,
  getUserView: (state) => state.userInterface.userView,
};
