// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import { interfaceReducer as userInterface } from '../bus/interface/reducer';
import { gameReducer as game } from '../bus/game/reducer';

// Instruments
import { history } from './middleware';

const router = connectRouter(history);

export const rootReducer = combineReducers({
  userInterface,
  game,
  router,
});
