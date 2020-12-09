import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';

import { innerWidth, innerHeight } from '../../init/clientBrowser';

// actions
import { gameActions } from './ations';

// helpers
import { generateAge, generateActualState } from './helpers';

const columns = Math.round((innerWidth - 35) / 21);
const rows = Math.round((innerHeight - 32) / 21);
const initialState = {
  columns, // grid columns
  rows, // grid rows
  waitTime: 0, // time of next step
  generation: 0, // counter of generations
  running: false, // playing or not
  autoplay: false,
  initialRender: '[{"39":[110]},{"40":[112]},{"41":[109,110,113,114,115]}]',

  listLife: {
    actualState: generateActualState(rows, columns),
    redrawList: [],
    age: generateAge(rows, columns, 'random'),
  },

  times: {
    algorithm: 0,
    gui: 0,
  },

  // Trail state
  trail: true,

  // Grid style
  grid: {
    current: 0,
    bgColor: '#fff',
  },

  // Zoom level
  zoom: {
    cellSize: 20,
    cellSpace: 1,
  },

  // Cell colors
  colors: {
    dead: '#4d4d4d',
    trail: '#43fed2',
    alive: '#3863ff',
  },
};

export const gameCellReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(gameActions.generateRandomAction, (state) => {
      try {
        const newData = update(state, {
          listLife: {
            actualState: {
              $set: generateActualState(
                state.rows,
                state.columns,
                state.listLife.actualState
              ),
            },
          },
        });
        return newData;
      } catch (error) {
        return state;
      }
    })
    .addCase(gameActions.setCanvasColor, (state, { payload }) => {
      try {
        const newData = update(state, {
          colors: {
            [payload.type]: { $set: payload.color },
          },
        });
        return newData;
      } catch (error) {
        return state;
      }
    })
    .addDefaultCase((state) => state);
});

// selectors
export const gameCellSelectors = {
  getCell: (state) => state.gameCell,
};
