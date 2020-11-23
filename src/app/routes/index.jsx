// Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { Root } from '../pages';

// book
import { book } from './book';

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact component={Root} path={book.root} />
        <Redirect to={book.root} />
      </Switch>
    </>
  );
};
