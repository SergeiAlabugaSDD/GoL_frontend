// Core
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { LoginPage, GamePage } from '../pages';
import { Loader } from '../components';

// bus
import { Error } from '../bus/error';

// book
import { book } from './book';

export const Routes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Switch>
          <Route exact component={LoginPage} path={book.login} />
          <Route component={GamePage} path={book.game} />
          <Redirect to={book.login} />
        </Switch>
      )}

      <Error />
    </>
  );
};
