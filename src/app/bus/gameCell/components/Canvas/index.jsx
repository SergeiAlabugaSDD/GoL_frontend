import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

// helpers
import { isAlive, drawCell } from '../../helpers';

export const Canvas = ({ gameCell }) => {
  const canvasRef = useRef(null);
  const { columns, rows, listLife, colors, trail, zoom } = gameCell;
  const width = columns * zoom.cellSpace + columns * zoom.cellSize;
  const height = rows * zoom.cellSpace + rows * zoom.cellSize;

  useEffect(() => {
    if (canvasRef) {
      const context = canvasRef.current.getContext('2d');
      const { actualState, age } = listLife;
      for (let i = 0; i < columns; i += 1) {
        for (let j = 0; j < rows; j += 1) {
          if (isAlive(i, j, actualState)) {
            drawCell(
              i,
              j,
              true,
              age,
              colors,
              context,
              trail,
              zoom.cellSpace,
              zoom.cellSize
            );
          } else {
            drawCell(
              i,
              j,
              false,
              age,
              colors,
              context,
              trail,
              zoom.cellSpace,
              zoom.cellSize
            );
          }
        }
      }
    }
  }, [
    gameCell,
    columns,
    listLife,
    rows,
    colors,
    trail,
    zoom.cellSize,
    zoom.cellSpace,
  ]);
  return (
    <canvas
      className="canvas-game"
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

Canvas.propTypes = {
  gameCell: PropTypes.shape().isRequired,
};
