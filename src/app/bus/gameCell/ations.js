import { createAction } from '@reduxjs/toolkit';

import { gameCellTypes } from './types';

export const gameActions = {
  generateRandomAction: createAction(gameCellTypes.GENERATE_RANDOM),
  setCanvasColor: createAction(gameCellTypes.SET_CANVAS_COLOR),
};
