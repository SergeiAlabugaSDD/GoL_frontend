import { createAction } from '@reduxjs/toolkit';

import { gameCellTypes } from './types';

export const gameActions = {
  generateRandomAction: createAction(gameCellTypes.GENERATE_RANDOM),
  setCanvasColor: createAction(gameCellTypes.SET_CANVAS_COLOR),
  toggleRun: createAction(gameCellTypes.TOGGLE_RUN),
  fillField: createAction(gameCellTypes.FILL_CURRENT_FIELD),
  clearField: createAction(gameCellTypes.CLEAR_CURRENT_FIELD),
  setTriger: createAction(gameCellTypes.SET_TRIGGER),
  goOneStep: createAction(gameCellTypes.GO_ONE_STEP),
  toggleAlive: createAction(gameCellTypes.TOGGLE_ALIVE),
  setChangedFalse: createAction(gameCellTypes.SET_CHANGED_FALSE),
  setZoom: createAction(gameCellTypes.SET_ZOOM),
  setRules: createAction(gameCellTypes.SET_RULES),
};
