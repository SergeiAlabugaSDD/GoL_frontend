import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';

// actions
import { actions } from './actions';

const initialState = {
  userView: {
    // height and width of user view
    innerWidth: 1,
    innerHeight: 1,
  },
  gameBar: {
    top: 20,
    left: 500,
    width: 800,
    height: 100,
    toggleConfig: false,
    centered: false,
  },
  themeBar: {
    top: 240,
    left: 140,
    show: false,
    height: 400,
    width: 100,
    tablet: false,
  },
  presetsBar: {
    show: false,
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
        if (
          leftPosition + state[payload.id].width >
          state.userView.innerWidth
        ) {
          leftPosition = state.userView.innerWidth - state[payload.id].width;
        }
        if (
          topPosition >
          state.userView.innerHeight - state[payload.id].height
        ) {
          topPosition = state.userView.innerHeight - state[payload.id].height;
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
    .addCase(
      actions.setUserView,
      // new data of user's innerWidth, innerHeight
      (state, { payload: { newHeight, newWidth } }) => {
        try {
          const { left, top, width } = state.gameBar;

          const tablet = newWidth <= 960;
          const getWidth = () => {
            if (tablet) return newWidth;
            return 800;
          };
          const getHeight = () => {
            return tablet ? 60 : 100;
          };
          const getLeft = () => {
            return tablet
              ? 0
              : Math.round(width + left > newWidth ? newWidth - width : left);
          };
          const getTop = () => {
            const height = getHeight();
            return Math.round(
              newHeight - height < top ? newHeight - height : top
            );
          };
          return update(state, {
            gameBar: {
              width: {
                $set: getWidth(),
              },
              height: {
                $set: getHeight(),
              },
              centered: { $set: tablet },
              left: {
                $set: getLeft(),
              },

              top: {
                $set: getTop(),
              },
            },
            themeBar: {
              top: {
                $set: tablet ? newHeight - 250 : state.themeBar.top,
              },
              left: { $set: tablet ? 0 : state.themeBar.left },
              height: { $set: tablet ? 250 : 400 },
              width: { $set: tablet ? 60 : 100 },
              tablet: { $set: tablet },
            },
            userView: {
              innerWidth: { $set: newWidth },
              innerHeight: { $set: newHeight },
            },
          });
        } catch (error) {
          return state;
        }
      }
    )
    .addCase(actions.togglePresetBar, (state) => {
      try {
        const newData = update(state, {
          presetsBar: {
            show: { $set: !state.presetsBar.show },
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
export const interfaceSelectors = {
  getInterface: (state) => state.userInterface,
  getRules: ({ userInterface }) => userInterface.rules,
  getView: ({ userInterface }) => userInterface.userView,
};
