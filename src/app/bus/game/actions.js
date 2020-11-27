import { createAction } from '@reduxjs/toolkit';

import { gameTypes } from './types';

export const actions = {
  nextTickAction: createAction(gameTypes.NEXT_TICK),
};
