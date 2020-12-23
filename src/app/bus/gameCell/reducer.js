/* eslint-disable no-unused-vars */
import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';
// import { clone } from 'lodash-es';

import { innerWidth, innerHeight } from '../../init/clientBrowser';

// actions
import { gameActions } from './actions';

export function create2DArray(x, y, type, arrayOfPattern) {
  // x = columns, y = rows
  const res = [];
  for (let i = 0; i < x; i += 1) {
    const nested = new Uint8Array(y);
    for (let j = 0; j < y; j += 1) {
      nested[j] = type === 'random' ? Math.round(Math.random()) : 0;
    }
    res[i] = nested;
  }
  if (Array.isArray(arrayOfPattern)) {
    arrayOfPattern.forEach((item) => {
      // item = [index of row, index of column]
      res[item[1]][item[0]] = 1;
    });
  }
  return res;
}

const initColumns = Math.floor(innerWidth / 18);
const initRows = Math.floor(innerHeight / 18);

const tablet = innerWidth <= 960;

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
  limited: true,
  pattern: [],

  field: create2DArray(initColumns, initRows, 'random'),

  // Zoom level
  zoom: {
    cellSize: tablet ? 6 : 17,
    cellSpace: 1,
    resized: false,
  },

  // Cell colors
  colors: {
    dead: '#333333',
    alive: '#38ffa2',
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
    .addCase(
      gameActions.setSize,
      (state, { payload: { increase, userWidth, userHeight } }) => {
        try {
          let currentSellSize = increase
            ? state.zoom.cellSize + 1
            : state.zoom.cellSize - 1;

          if (increase === 'same') currentSellSize = state.zoom.cellSize;

          if (currentSellSize <= 4 || currentSellSize >= 25) return state;
          return update(state, {
            columns: {
              $set: Math.floor((userWidth - 10) / (currentSellSize + 1)),
            },
            rows: {
              $set: Math.floor((userHeight - 10) / (currentSellSize + 1)),
            },
            zoom: {
              cellSize: {
                $set: currentSellSize,
              },
              resized: { $set: true },
            },
          });
        } catch (error) {
          return state;
        }
      }
    )
    .addCase(gameActions.setResizedFalse, (state) => {
      try {
        return update(state, {
          zoom: {
            resized: { $set: false },
          },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.setWaitTime, (state, { payload }) => {
      try {
        return update(state, {
          waitTime: { $set: payload },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.toggleLimitedField, (state) => {
      try {
        return update(state, {
          limited: { $set: !state.limited },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.setSinglePattern, (state, { payload }) => {
      try {
        return update(state, {
          pattern: { $set: payload },
          changed: { $set: true },
          running: { $set: false },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.setPatternNull, (state) => {
      try {
        return update(state, {
          pattern: { $set: [] },
        });
      } catch (error) {
        return state;
      }
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
      limited,
      pattern,
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
      limited,
      pattern,
    };
  },
  getField: ({ gameCell }) => {
    return gameCell.field;
  },
};
