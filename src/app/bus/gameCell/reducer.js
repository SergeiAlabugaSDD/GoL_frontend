import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';
// import { clone } from 'lodash-es';

import { innerWidth, innerHeight } from '../../init/clientBrowser';

// actions
import { gameActions } from './actions';

export function create2DArray(x, y, type) {
  const res = [];
  for (let i = 0; i < x; i += 1) {
    const nested = new Uint8Array(y);
    for (let j = 0; j < y; j += 1) {
      nested[j] = type === 'random' ? Math.round(Math.random()) : 0;
    }
    res[i] = nested;
  }
  return res;
}

const initColumns = Math.round((innerWidth - 35) / 21);
const initRows = Math.round((innerHeight - 32) / 21);

const initialState = {
  columns: initColumns, // grid columns
  rows: initRows, // grid rows
  waitTime: 0, // time of next step
  generation: 0, // counter of generations
  running: false, // playing or not
  goOneStep: false, // this flag we use in Canvas component for checking events
  changed: false, // this flag we use in Canvas component for checking events
  random: false, // this flag we use in Canvas component for checking events
  clear: false, // flag for record field to state
  triger: 0,

  field: create2DArray(initColumns, initRows, 'random'),

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
    .addCase(gameActions.generateRandomAction, (state) => {
      try {
        return update(state, {
          running: { $set: false },
          changed: { $set: true },
          random: { $set: !state.random },
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
      try {
        return update(state, {
          running: { $set: !state.running },
          changed: { $set: state.running },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.setChangedFalse, (state) => {
      try {
        return update(state, {
          changed: { $set: false },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.goOneStep, (state) => {
      try {
        return update(state, {
          running: { $set: false },
          changed: { $set: true },
          goOneStep: { $set: !state.goOneStep },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.fillField, (state, { payload }) => {
      try {
        const newData = update(state, {
          field: { $set: payload },
          changed: { $set: false },
        });

        return newData;
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.clearField, (state) => {
      try {
        return update(state, {
          running: { $set: false },
          changed: { $set: true },
          clear: { $set: !state.clear },
        });
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
      changed,
      clear,
      random,
      goOneStep,
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
      changed,
      clear,
      random,
      goOneStep,
      generation,
      triger,
      rules,
    };
  },
  getField: ({ gameCell }) => {
    return gameCell.field;
  },
};
