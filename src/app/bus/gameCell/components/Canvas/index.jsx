import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';

// actions
// import { gameActions } from '../../actions';
import { toggleGame, getResultGrid } from './algorithm';

export const Canvas = React.memo(({ gameCell }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const {
    columns,
    rows,
    colors,
    waitTime,
    zoom: { cellSpace, cellSize },
    generation,
    running,
    triger,
  } = gameCell;
  const width = columns * cellSpace + columns * cellSize;
  const height = rows * cellSpace + rows * cellSize;

  useEffect(() => {
    const field = getResultGrid();
    if (canvasRef) {
      const context = canvasRef.current.getContext('2d');
      for (let i = 0; i < field.length; i += 1) {
        for (let j = 0; j < field[i].length; j += 1) {
          if (field[i][j] === 1) {
            context.fillStyle = colors.alive;
          } else context.fillStyle = colors.dead;

          context.fillRect(
            cellSpace + cellSpace * i + cellSize * i,
            cellSpace + cellSpace * j + cellSize * j,
            cellSize,
            cellSize
          );
        }
      }
    }
    if (running) {
      toggleGame(dispatch, running, waitTime);
    }
  }, [
    colors,
    triger,
    running,
    generation,
    dispatch,
    cellSpace,
    cellSize,
    waitTime,
  ]);
  return (
    <canvas
      id="canvas"
      className="canvas-game"
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
});

Canvas.propTypes = {
  gameCell: PropTypes.shape().isRequired,
};
