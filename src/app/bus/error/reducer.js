import { createReducer } from '@reduxjs/toolkit';
import update from 'immutability-helper';

// actions
import { errorActions } from './actions';

const initialState = {
  error: false,
  type: '',
  message: '',
  decription: '',
};

export const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      errorActions.setError,
      (state, { payload: { error, type, message, description } }) => {
        try {
          const newData = update(state, {
            error: { $set: error },
            type: { $set: type },
            message: { $set: message },
            description: { $set: description },
          });
          return newData;
        } catch (err) {
          return state;
        }
      }
    )
    .addCase(errorActions.setErrorNull, (state) => {
      try {
        const newData = update(state, {
          error: { $set: false },
          type: { $set: '' },
          message: { $set: '' },
          tydescriptionpe: { $set: '' },
        });
        return newData;
      } catch (err) {
        return state;
      }
    })
    .addDefaultCase((state) => state);
});

// selectors
export const errorSelectors = {
  getError: (state) => state.errorHandler,
};
