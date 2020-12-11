/* eslint-disable no-use-before-define */
/* eslint-disable no-continue */

// description
// 1. x = columns, y = rows
// 2. i,j,k declared for iterations
// 0 = dead, 1 = alive

import { throttle } from 'lodash-es';
import { gameActions } from '../../actions';
// import { columns, rows } from '../../reducer';

let columns = 0;
let rows = 0;
let waitTime = 0;
let started = false;
let disp;
let born = 3;
let keepAlive = [2, 3];

// let oldOn;

function create2DArray(x, y) {
  const res = [];
  for (let i = 0; i < x; i += 1) {
    const nested = new Uint8Array(y);
    for (let j = 0; j < y; j += 1) {
      nested[j] = Math.round(Math.random());
    }
    res[i] = nested;
  }
  return res;
}

let field = [];

const getResultGrid = () => {
  return field;
};

function set(x, y, mousePressed) {
  if (field[x][y] === 1 && !mousePressed) {
    field[x][y] = 0;
  } else field[x][y] = 1;
  disp(gameActions.setTriger());
  return undefined;
}

function clearCanvas() {
  for (let i = 0; i < columns; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      field[i][j] = 0;
    }
  }
  disp(gameActions.setTriger());
}

function countLiveNeighbors(grid, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i += 1) {
    for (let j = -1; j < 2; j += 1) {
      const col = (x + i + columns) % columns; // Замыкает плоскость в тор
      const row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }

  if (grid[x][y] === 1) {
    sum -= 1;
  }

  return sum;
}

const tick = () => {
  const next = create2DArray(columns, rows);

  for (let i = 0; i < columns; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const neighbors = countLiveNeighbors(field, i, j);

      if (neighbors < keepAlive[0] || neighbors > keepAlive[1]) {
        // die
        next[i][j] = 0;
      } else if (field[i][j] === 0 && neighbors === born) {
        // born
        next[i][j] = 1;
      } else if (
        field[i][j] === 1 &&
        (neighbors <= keepAlive[1] || neighbors >= keepAlive[0])
      ) {
        // keep alive
        next[i][j] = 1;
      } else next[i][j] = 0;
    }
  }
  field = next;

  disp(gameActions.setTriger());
};

const toggleGame = (running, time) => {
  waitTime = time;
  started = running;
  if (started) {
    const throttleTick = throttle(tick, waitTime, { leading: false });
    throttleTick();
  }
};

const prepare = (currentCols, currentRows, rules, dispatch) => {
  columns = currentCols;
  rows = currentRows;
  born = rules.born;
  keepAlive = rules.alive;
  disp = dispatch;
  field = create2DArray(columns, rows);
};

export { toggleGame, set, getResultGrid, tick, clearCanvas, prepare };
