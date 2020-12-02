import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';

// helpers
import { generateGrid, shortUUID } from './helpers';

// actions
import { actions } from './actions';

let innerWidth;
let innerHeight;

if (window) {
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
}

const initialState = {
  grid: generateGrid(100, 100, shortUUID), // grid of game
  options: {
    // options of game
    born: 3,
    surv: 2,
  },
  userView: {
    // height and width of user view
    innerWidth,
    innerHeight,
  },
  gameBar: {
    top: 20,
    left: innerWidth / 2 - 40,
    width: innerWidth / 2,
  },
  themeBar: {
    top: 20,
    left: 20,
    show: true,
  },
  resizeble: {
    isStartResizing: false,
    width: 70 * (innerWidth / 100),
  },
};

export const interfaceReducer = createReducer(initialState, (builder) => {
  let row = 0;
  let column = 0;
  builder
    .addCase(actions.nextTickAction, (state, { payload }) => {
      try {
        row = Math.round(Math.random() * 50);
        column = Math.round(Math.random() * 50);
        const newData = update(state, {
          grid: { [row]: { [column]: { $set: payload } } },
        });
        return newData;
      } catch (error) {
        return state;
      }
    })
    .addCase(actions.moveItemOfInterface, (state, { payload }) => {
      try {
        let topPosition = payload.top;
        let leftPosition = payload.left;
        if (leftPosition < 0) {
          leftPosition = 0;
        }
        if (leftPosition > state.gameBar.width) {
          leftPosition = state.gameBar.width;
        }
        if (topPosition > innerHeight - 100) {
          topPosition = innerHeight - 100;
        }
        if (topPosition < 0) {
          topPosition = 0;
        }
        const newData = update(state, {
          gameBar: {
            top: { $set: topPosition },
            left: { $set: leftPosition },
          },
        });
        return newData;
      } catch (error) {
        return state;
      }
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
  getGrid: (state) => state.userInterface.grid,
  getInterface: (state) => state.userInterface,
  getResizeble: (state) => state.userInterface.resizeble,
  getUserView: (state) => state.userInterface.userView,
};
