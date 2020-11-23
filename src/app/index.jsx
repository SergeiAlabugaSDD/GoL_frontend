import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// drag'n'drop
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

// Instruments
import { store } from './init/store';
import { history } from './init/middleware';

// Routes
import { Routes } from './routes';

const dndOptions = {
  enableMouseEvents: true,
  enableKeyboardEvents: true,
};

export const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <DndProvider backend={TouchBackend} options={dndOptions}>
        <Routes />
      </DndProvider>
    </Router>
  </Provider>
);
