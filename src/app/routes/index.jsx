// Core
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { Login, Game } from '../pages';

// book
import { book } from './book';

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact component={Login} path={book.login} />
        <Route component={Game} path={book.game} />
        <Redirect to={book.login} />
      </Switch>
    </>
  );
};
