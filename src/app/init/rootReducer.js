// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import { interfaceReducer as userInterface } from '../bus/interface/reducer';
import { gameCellReducer as gameCell } from '../bus/gameCell/reducer';
import { errorReducer as errorHandler } from '../bus/error/reducer';

// Instruments
import { history } from './middleware';

const router = connectRouter(history);

export const rootReducer = combineReducers({
  userInterface,
  gameCell,
  errorHandler,
  router,
});
