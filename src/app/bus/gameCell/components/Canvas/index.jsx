import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';

// actions
// import { gameActions } from '../../actions';
import { toggleGame, getResultGrid, prepare, set } from './algorithm';

export const Canvas = React.memo(({ gameCell }) => {
  const [mousePressed, setMousePressed] = useState(false);
  const [first, setFirst] = useState(true);
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
    rules,
  } = gameCell;
  const width = columns * cellSpace + columns * cellSize;
  const height = rows * cellSpace + rows * cellSize;

  // handlers
  const mousePosition = (e) => {
    let domObject;
    let posx = 0;
    let posy = 0;
    let top = 0;
    let left = 0;
    const rectWidth = cellSpace + cellSize;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    domObject = e.target || e.srcElement;

    while (domObject.offsetParent) {
      left += domObject.offsetLeft;
      top += domObject.offsetTop;
      domObject = domObject.offsetParent;
    }

    domObject.pageTop = top;
    domObject.pageLeft = left;

    const x = Math.ceil((posx - domObject.pageLeft) / rectWidth - 1);
    const y = Math.ceil((posy - domObject.pageTop) / rectWidth - 1);

    return [Math.abs(x), Math.abs(y)];
  };

  const mouseDownHandler = (e) => {
    e.stopPropagation();
    setMousePressed(true);
    const [column, row] = mousePosition(e);
    set(column, row);
  };

  const mouseUpHandler = (e) => {
    e.stopPropagation();
    setMousePressed(false);
  };

  const mouseMoveHandler = (e) => {
    e.stopPropagation();
    if (mousePressed) {
      const [column, row] = mousePosition(e);
      set(column, row, mousePressed);
    }
  };

  // first render need prepare canvas and data for algorithm from store
  if (first) {
    prepare(columns, rows, rules, dispatch);
    setFirst(false);
  }

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
      onMouseDownCapture={mouseDownHandler}
      onMouseMoveCapture={mouseMoveHandler}
      onMouseUpCapture={mouseUpHandler}
    />
  );
});

Canvas.propTypes = {
  gameCell: PropTypes.shape().isRequired,
};
