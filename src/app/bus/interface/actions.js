import { createAction } from '@reduxjs/toolkit';

import { interfaceTypes } from './types';

export const actions = {
  moveItemOfInterface: createAction(interfaceTypes.MOVE_ITEM_OF_INTERFACE),
  toggleThemeBarAction: createAction(interfaceTypes.TOGGLE_THEME_BAR),
  toggleConfigBar: createAction(interfaceTypes.TOGGLE_CONFIG_BAR),
  setBorn: createAction(interfaceTypes.SET_BORN),
  setAlive: createAction(interfaceTypes.SET_ALIVE),
  setUserView: createAction(interfaceTypes.SET_USER_VIEW),
  togglePresetBar: createAction(interfaceTypes.TOGGLE_PRESET_BAR),
};
