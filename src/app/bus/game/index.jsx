/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';

// styles
import './styles.css';

// selectors
import { gameSelectors } from './reducer';
import { interfaceSelectors } from '../interface/reducer';

// actions
import { actions } from './actions';

export const Game = () => {
  const dispatch = useDispatch();
  const grid = useSelector(gameSelectors.getGrid);
  const { width, isStartResizing } = useSelector(
    interfaceSelectors.getResizeble
  );
  const { innerHeight } = useSelector(interfaceSelectors.getUserView);

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
      style={style}
      className={`${grid[columnIndex][rowIndex] === 1 ? 'life' : 'dead'}`}
    />
  );

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(actions.nextTickAction(Math.round(Math.random())));
    }, 100000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="game_wrapper">
      {isStartResizing ? null : (
        <Grid
          className="grid_game"
          columnCount={100}
          columnWidth={26}
          height={innerHeight - 110}
          rowCount={100}
          rowHeight={26}
          width={width - 30}
          overscanColumnCount={15}
          overscanRowCount={15}
        >
          {Cell}
        </Grid>
      )}
    </div>
  );
};
