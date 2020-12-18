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
  setSize: createAction(gameCellTypes.SET_SIZE),
  setResizedFalse: createAction(gameCellTypes.SET_RESIZED_FALSE),
  setWaitTime: createAction(gameCellTypes.SET_WAIT_TIME),
};
