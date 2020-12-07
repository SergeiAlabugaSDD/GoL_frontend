import { createAction } from '@reduxjs/toolkit';

import { interfaceTypes } from './types';

export const actions = {
  moveItemOfInterface: createAction(interfaceTypes.MOVE_ITEM_OF_INTERFACE),
  moveResizeble: createAction(interfaceTypes.MOVE_RESIZEBLE),
  startResizing: createAction(interfaceTypes.START_RESIZING),
  endResizing: createAction(interfaceTypes.END_RESIZING),
  nextTickAction: createAction(interfaceTypes.NEXT_TICK),
  toggleThemeBarAction: createAction(interfaceTypes.TOGGLE_THEME_BAR),
};
