import { createAction } from '@reduxjs/toolkit';

import { errorTypes } from './types';

export const errorActions = {
  setError: createAction(errorTypes.SET_ERROR),
  setErrorNull: createAction(errorTypes.SET_ERROR_NULL),
};
