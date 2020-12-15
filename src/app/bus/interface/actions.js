import { createAction } from '@reduxjs/toolkit';

import { interfaceTypes } from './types';

export const actions = {
  moveItemOfInterface: createAction(interfaceTypes.MOVE_ITEM_OF_INTERFACE),
  toggleThemeBarAction: createAction(interfaceTypes.TOGGLE_THEME_BAR),
  toggleConfigBar: createAction(interfaceTypes.TOGGLE_CONFIG_BAR),
};
