/* eslint-disable no-continue */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { throttle } from 'lodash-es';

// actions
import { gameActions } from '../../actions';
import { errorActions } from '../../../error/actions';

// helpers
import { create2DArray } from '../../reducer';

// styles
import './styles.css';

// we need pure mutating JS for better perfomance
let currentField = [];

export const Canvas = ({ gameCell, field, rules, innerHeight, innerWidth }) => {
  const [mousePressed, setMousePressed] = useState(false);

  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const {
    columns,
    rows,
    colors,
    waitTime,
    zoom: { cellSpace, cellSize, resized },
    running,
    changed,
    clear,
    random,
    goOneStep,
    triger,
    limited,
    pattern,
  } = gameCell;
  const { born, alive } = rules;
  const currentBorn = born.indexOf(1) + 1;

  // handlers
  const mousePosition = (e, touchX, touchY) => {
    let domObject;
    let posx = 0;
    let posy = 0;
    let top = 0;
    let left = 0;
    const rectWidth = cellSpace + cellSize;

    posx = touchX || e.pageX;
    posy = touchY || e.pageY;

    domObject = e.target;

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
    setMousePressed(false);
    const [column, row] = mousePosition(e);
    if (!mousePressed) {
      if (currentField[column]) {
        currentField[column][row] = 1;
      }
    } else if (currentField[column]) {
      currentField[column][row] = currentField[column][row] === 1 ? 0 : 1;
      dispatch(gameActions.setTriger());
    }
  };

  const mouseDownHandler = (e) => {
    if (running) dispatch(gameActions.toggleRun());
    if (e.button !== 2) setTimeout(() => setMousePressed(true), 10);
  };

  const mouseUpHandler = () => {
    dispatch(gameActions.fillField(currentField));
  };

  const mouseMoveHandler = throttle(
    (e) => {
      if (mousePressed) {
        const [column, row] = mousePosition(e);
        if (currentField[column]) {
          currentField[column][row] = 1;
        } else return;
        dispatch(gameActions.setTriger());
      }
    },
    10,
    { leading: false }
  );

  const touchMoveHandler = throttle(
    (e) => {
      if (e.touches.length === 1) {
        const { pageX } = e.touches[0];
        const { pageY } = e.touches[0];
        const [column, row] = mousePosition(e, pageX, pageY);
        if (currentField[column]) {
          currentField[column][row] = 1;
        } else return;
        dispatch(gameActions.setTriger());
      }
    },
    20,
    { leading: false }
  );

  // helper for algorithm
  const countLiveNeighborsInfinity = (x, y) => {
    // торообразная плоскость
    let sum = 0;

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        const col = (x + i + columns) % columns; // Замыкает плоскость в тор
        const row = (y + j + rows) % rows;
        if (currentField[col] && currentField[col][row] !== undefined)
          sum += currentField[col][row];
        continue;
      }
    }
    if (currentField[x] && currentField[x][y] === 1) {
      sum -= 1;
    }

    return sum;
  };

  const countLiveNeighborsLimited = (x, y) => {
    // конечное поле
    let sum = 0;

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        const col = x + i;
        const row = y + j;
        if (currentField[col] && currentField[col][row] !== undefined)
          sum += currentField[col][row];
        continue;
      }
    }
    if (currentField[x] && currentField[x][y] === 1) {
      sum -= 1;
    }

    return sum;
  };

  // resize canvas
  const resize = () => {
    const nextGeneration = create2DArray(columns, rows);

    for (let i = 0; i < columns; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        nextGeneration[i][j] =
          currentField[i] && currentField[i][j] ? currentField[i][j] : 0;
      }
    }

    currentField = nextGeneration;
  };

  // calculate next generation
  const tick = throttle(
    () => {
      if (resized) {
        dispatch(gameActions.setResizedFalse());
        return;
      }
      const neighborsCalc = limited
        ? countLiveNeighborsLimited
        : countLiveNeighborsInfinity;
      const next = create2DArray(columns, rows);
      for (let i = 0; i < columns; i += 1) {
        if (currentField[i] === undefined) {
          dispatch(gameActions.setTriger());
          return;
        }
        for (let j = 0; j < rows; j += 1) {
          const neighbors = neighborsCalc(i, j);

          if (neighbors < alive[0] || neighbors > alive[1]) {
            // die
            next[i][j] = 0;
          } else if (currentField[i][j] === 0 && neighbors === currentBorn) {
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
      // triggering for rerender component
      dispatch(gameActions.setTriger());
    },
    waitTime,
    { leading: false }
  );

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
      if (pattern.length !== 0) {
        // set pattern
        try {
          const nextField = create2DArray(columns, rows, 'pattern', pattern);
          currentField = nextField;
          dispatch(gameActions.fillField(nextField));
          dispatch(gameActions.setPatternNull());
        } catch (error) {
          dispatch(
            errorActions.setError({
              error: true,
              message:
                "Please, change zoom smaller. The pattern doesn't fit in current field",
              type: error.name,
              description: error.message,
            })
          );
        }
      }
      // this action set flag changed to false
      dispatch(gameActions.fillField(currentField));
    }
    if (!currentField.length) {
      // init current field from store
      currentField = field;
    }
    const context = canvasRef.current.getContext('2d');

    if (resized) {
      context.clearRect(0, 0, innerWidth, innerHeight);
      resize();

      dispatch(gameActions.setResizedFalse());
    }
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
      tick();
      return;
    }
    if (goOneStep && !resized) {
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
    resized,
    columns,
  ]);
  return (
    <>
      <canvas
        id="canvas"
        className="canvas-game"
        ref={canvasRef}
        width={innerWidth - 10}
        height={innerHeight - 1}
        style={{ margin: '0 auto' }}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
        onClick={clickHandler}
        // onTouchStart={mouseDownHandler}
        onTouchMove={touchMoveHandler}
        // onTouchEnd={mouseUpHandler}
      />
    </>
  );
};

Canvas.propTypes = {
  gameCell: PropTypes.shape().isRequired,
  field: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  rules: PropTypes.shape().isRequired,
  innerHeight: PropTypes.number.isRequired,
  innerWidth: PropTypes.number.isRequired,
};
