import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';

import { innerWidth, innerHeight } from '../../init/clientBrowser';

// actions
import { actions } from './actions';

const initialState = {
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
    toggleConfig: false,
  },
  themeBar: {
    top: 240,
    left: innerWidth - 140,
    show: false,
    height: innerHeight / 2 - 100,
    width: 100,
  },
  rules: {
    born: [0, 0, 1, 0, 0, 0, 0, 0],
    alive: [2, 3],
  },
};

export const interfaceReducer = createReducer(initialState, (builder) => {
  builder
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
      try {
        const newData = update(state, {
          themeBar: {
            show: { $set: !state.themeBar.show },
          },
        });
        return newData;
      } catch (error) {
        return state;
      }
    })
    .addCase(actions.toggleConfigBar, (state) => {
      try {
        const newData = update(state, {
          gameBar: {
            toggleConfig: { $set: !state.gameBar.toggleConfig },
          },
        });
        return newData;
      } catch (error) {
        return state;
      }
    })
    .addCase(actions.setBorn, (state, { payload }) => {
      try {
        return update(state, {
          rules: {
            born: { $set: payload },
          },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(actions.setAlive, (state, { payload }) => {
      try {
        return update(state, {
          rules: {
            alive: { $set: payload },
          },
        });
      } catch (error) {
        return state;
      }
    })
    .addCase(actions.setUserView, (state, { payload: { height, width } }) => {
      try {
        return update(state, {
          userView: {
            innerWidth: { $set: width },
            innerHeight: { $set: height },
          },
        });
      } catch (error) {
        return state;
      }
    })
    .addDefaultCase((state) => state);
});

// selectors
export const interfaceSelectors = {
  getInterface: (state) => state.userInterface,
  getRules: ({ userInterface }) => userInterface.rules,
  getView: ({ userInterface }) => userInterface.userView,
};
