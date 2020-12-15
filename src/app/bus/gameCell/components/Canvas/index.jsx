/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';

// actions
import { gameActions } from '../../actions';
import { create2DArray } from '../../reducer';

// we need pure mutating JS for better perfomance
let currentField = [];

export const Canvas = ({ gameCell, field }) => {
  const [mousePressed, setMousePressed] = useState(false);

  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const {
    columns,
    rows,
    colors,
    waitTime,
    zoom: { cellSpace, cellSize },
    running,
    changed,
    clear,
    random,
    goOneStep,
    triger,
    rules: { born, alive },
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

  const clickHandler = (e) => {
    const [column, row] = mousePosition(e);
    currentField[column][row] = currentField[column][row] === 1 ? 0 : 1;
    dispatch(gameActions.setTriger());
  };

  const mouseDownHandler = (e) => {
    e.stopPropagation();
    setMousePressed(true);
  };

  const mouseUpHandler = (e) => {
    e.stopPropagation();
    setMousePressed(false);
    dispatch(gameActions.fillField(currentField));
  };

  const mouseMoveHandler = throttle(
    (e) => {
      e.stopPropagation();
      if (mousePressed) {
        const [column, row] = mousePosition(e);
        currentField[column][row] = 1;
        dispatch(gameActions.setTriger());
      }
    },
    20,
    { leading: false }
  );

  // helper for algorithm
  const countLiveNeighbors = (x, y) => {
    let sum = 0;

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        const col = (x + i + columns) % columns; // Замыкает плоскость в тор
        const row = (y + j + rows) % rows;
        sum += currentField[col][row];
      }
    }

    if (currentField[x][y] === 1) {
      sum -= 1;
    }

    return sum;
  };

  // calculate next generation
  const tick = () => {
    const next = create2DArray(columns, rows);

    for (let i = 0; i < columns; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const neighbors = countLiveNeighbors(i, j);

        if (neighbors < alive[0] || neighbors > alive[1]) {
          // die
          next[i][j] = 0;
        } else if (currentField[i][j] === 0 && neighbors === born) {
          // born
          next[i][j] = 1;
        } else if (
          currentField[i][j] === 1 &&
          (neighbors <= alive[1] || neighbors >= alive[0])
        ) {
          // keep alive
          next[i][j] = 1;
        } else next[i][j] = 0;
      }
    }

    currentField = next;

    if (running) {
      // triggering for rerender component
      dispatch(gameActions.setTriger());
    }
  };

  const throttleTick = throttle(tick, waitTime, { leading: false });

  useEffect(() => {
    if (!running && changed) {
      if (clear) {
        // clear field
        const nextField = create2DArray(columns, rows);
        currentField = nextField;
        dispatch(gameActions.fillField(nextField));
        dispatch(gameActions.clearField());
      }
      if (random) {
        // generate random
        const nextField = create2DArray(columns, rows, 'random');
        currentField = nextField;
        dispatch(gameActions.fillField(nextField));
        dispatch(gameActions.generateRandomAction());
      }
      // this action set flag changed to false
      dispatch(gameActions.fillField(currentField));
    }
    if (!currentField.length) {
      // init current field from store
      currentField = field;
    }
    const context = canvasRef.current.getContext('2d');

    // render canvas
    for (let i = 0; i < currentField.length; i += 1) {
      for (let j = 0; j < currentField[i].length; j += 1) {
        if (currentField[i][j] === 1) {
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
    if (running) {
      // check flag "running"
      throttleTick();
      return;
    }
    if (goOneStep) {
      // flag for just one step
      tick();
      dispatch(gameActions.goOneStep());
    }
  }, [
    changed,
    field,
    colors,
    triger,
    running,
    goOneStep,
    dispatch,
    cellSpace,
    cellSize,
    throttleTick,
  ]);
  return (
    <canvas
      id="canvas"
      className="canvas-game"
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      onClick={clickHandler}
    />
  );
};

Canvas.propTypes = {
  gameCell: PropTypes.shape().isRequired,
  field: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
