import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';

// actions
import { actions } from './actions';

// helpers
import { generateGrid, shortUUID } from './helpers';

const initialState = {
  grid: generateGrid(100, 100, shortUUID),
  options: {
    born: 3,
    surv: 2,
  },
};

export const gameReducer = createReducer(initialState, (builder) => {
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
    .addDefaultCase((state) => state);
});

export const gameSelectors = {
  getGrid: (state) => state.game.grid,
  // getResizeble: (state) => state.userInterface.resizeble,
};
