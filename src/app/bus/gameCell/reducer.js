import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';

import { innerWidth, innerHeight } from '../../init/clientBrowser';

// actions
import { gameActions } from './actions';

function create2DArray(x, y) {
  const res = [];
  for (let i = 0; i < x; i += 1) {
    const nested = new Uint8Array(y);
    for (let j = 0; j < y; j += 1) {
      nested[j] = 0;
    }
    res[i] = nested;
  }
  res[0][1] = 1;
  res[1][1] = 1;
  res[2][1] = 1;
  return res;
}

const initColumns = Math.round((innerWidth - 35) / 21);
const initRows = Math.round((innerHeight - 32) / 21);

const initialState = {
  columns: initColumns, // grid columns
  rows: initRows, // grid rows
  waitTime: 30, // time of next step
  generation: 0, // counter of generations
  running: false, // playing or not
  triger: 0,

  field: create2DArray(initColumns, initRows),

  // Zoom level
  zoom: {
    cellSize: 20,
    cellSpace: 1,
  },

  rules: {
    born: 3,
    alive: [2, 3],
  },

  // Cell colors
  colors: {
    dead: '#4d4d4d',
    alive: '#3863ff',
  },
};

export const gameCellReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(gameActions.generateRandomAction, (state, { payload }) => {
      try {
        return update(state, {
          field: {
            $set: payload,
          },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.setCanvasColor, (state, { payload }) => {
      try {
        return update(state, {
          colors: {
            [payload.type]: { $set: payload.color },
          },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.toggleRun, (state) => {
      return {
        ...state,
        running: !state.running,
      };
    })
    .addCase(gameActions.fillField, (state, { payload }) => {
      try {
        const newData = update(state, {
          field: { $set: payload },
        });

        return newData;
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.setTriger, (state) => {
      return {
        ...state,
        triger: state.triger + 1,
      };
    })
    .addDefaultCase((state) => state);
});

// selectors
export const gameCellSelectors = {
  getCellConfig: ({
    gameCell: {
      columns,
      rows,
      colors,
      zoom,
      waitTime,
      running,
      generation,
      triger,
      rules,
    },
  }) => {
    return {
      columns,
      rows,
      colors,
      zoom,
      waitTime,
      running,
      generation,
      triger,
      rules,
    };
  },
  getField: ({ gameCell }) => {
    return gameCell.field;
  },
};
