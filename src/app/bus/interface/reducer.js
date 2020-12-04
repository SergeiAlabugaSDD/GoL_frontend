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
    height: 100,
  },
  themeBar: {
    top: 20,
    left: 20,
    show: true,
    height: innerHeight / 2 - 100,
    width: 100,
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
          //
          leftPosition = 0;
        }
        if (leftPosition + state[payload.id].width > innerWidth) {
          leftPosition = innerWidth - state[payload.id].width;
        }
        if (topPosition > innerHeight - state[payload.id].height) {
          topPosition = innerHeight - state[payload.id].height;
        }
        if (topPosition < 0) {
          topPosition = 0;
        }

        const newData = update(state, {
          [payload.id]: {
            top: { $set: topPosition },
            left: { $set: leftPosition },
          },
        });
        return newData;
      } catch (error) {
        return state;
      }
    })
    .addCase(actions.toggleThemeBarAction, (state) => {
      const newData = update(state, {
        themeBar: {
          show: { $set: !state.themeBar.show },
        },
      });
      return newData;
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
