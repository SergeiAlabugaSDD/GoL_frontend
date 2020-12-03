// Core
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { LoginPage, GamePage } from '../pages';
import { Loader } from '../components';

// book
import { book } from './book';

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    setLoading(false);

    // re-rendered the Route if trigered resize on window
    const resizeHandler = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler); // clean memory
  }, [size]);

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
    </>
  );
};
