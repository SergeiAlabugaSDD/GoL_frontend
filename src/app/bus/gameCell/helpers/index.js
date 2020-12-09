// function changeCelltoDead(i, j, age) {
//   if (i >= 0 && i < columns && j >= 0 && j < rows) {
//     age[i][j] = -age[i][j]; // Keep trail
//     drawCell(i, j, false);
//   }
// }

function random(min, max) {
  return min <= max ? min + Math.round(Math.random() * (max - min)) : null;
}

// function switchCell(i, j, listLife) {
//   if (listLife.isAlive(i, j)) {
//     changeCelltoDead(i, j);
//     listLife.removeCell(i, j, listLife.actualState);
//   } else {
//     changeCelltoAlive(i, j);
//     listLife.addCell(i, j, listLife.actualState);
//   }
// }

// // cellSize размер одной клетки
// function mousePosition(e, cellSize) {
//   let event;
//   let domObject;
//   let posx = 0;
//   let posy = 0;
//   let top = 0;
//   let left = 0;

//   event = e;
//   if (!event) {
//     event = window.event;
//   }

//   if (event.pageX || event.pageY) {
//     posx = event.pageX;
//     posy = event.pageY;
//   } else if (event.clientX || event.clientY) {
//     posx =
//       event.clientX +
//       document.body.scrollLeft +
//       document.documentElement.scrollLeft;
//     posy =
//       event.clientY +
//       document.body.scrollTop +
//       document.documentElement.scrollTop;
//   }

//   domObject = event.target || event.srcElement;

//   while (domObject.offsetParent) {
//     left += domObject.offsetLeft;
//     top += domObject.offsetTop;
//     domObject = domObject.offsetParent;
//   }

//   domObject.pageTop = top;
//   domObject.pageLeft = left;

//   const x = Math.ceil((posx - domObject.pageLeft) / cellSize - 1);
//   const y = Math.ceil((posy - domObject.pageTop) / cellSize - 1);

//   return [x, y];
// }

function addCell(x, y, state) {
  if (state.length === 0) {
    state.push([y, x]);
    return;
  }

  let k;
  let n;
  let m;
  let tempRow;
  let newState = [];
  let added;

  if (y < state[0][0]) {
    // Add to Head
    newState = [[y, x]];
    for (k = 0; k < state.length; k += 1) {
      newState[k + 1] = state[k];
    }

    for (k = 0; k < newState.length; k += 1) {
      state[k] = newState[k];
    }
  } else if (y > state[state.length - 1][0]) {
    // Add to Tail
    state[state.length] = [y, x];
  } else {
    // Add to Middle

    for (n = 0; n < state.length; n += 1) {
      if (state[n][0] === y) {
        // Level Exists
        tempRow = [];
        added = false;
        for (m = 1; m < state[n].length; m += 1) {
          if (!added && x < state[n][m]) {
            tempRow.push(x);
            added = !added;
          }
          tempRow.push(state[n][m]);
        }
        tempRow.unshift(y);
        if (!added) {
          tempRow.push(x);
        }
        state[n] = tempRow;
        return;
      }

      if (y < state[n][0]) {
        // Create Level
        newState = [];
        for (k = 0; k < state.length; k += 1) {
          if (k === n) {
            newState[k] = [y, x];
            newState[k + 1] = state[k];
          } else if (k < n) {
            newState[k] = state[k];
          } else if (k > n) {
            newState[k + 1] = state[k];
          }
        }

        for (k = 0; k < newState.length; k += 1) {
          state[k] = newState[k];
        }

        return;
      }
    }
  }
}

// // actualState of listLife
function isAlive(x, y, actualState) {
  for (let i = 0; i < actualState.length; i += 1) {
    if (actualState[i][0] === y) {
      for (let j = 1; j < actualState[i].length; j += 1) {
        if (actualState[i][j] === x) {
          return true;
        }
      }
    }
  }
  return false;
}

function generateActualState(rows, columns) {
  const liveCells = rows * columns * 0.12;
  const genState = [];
  for (let i = 0; i < liveCells; i += 1) {
    addCell(random(0, columns - 1), random(0, rows - 1), genState);
  }
  return genState;
}

function generateAge(columns, rows, type) {
  const resultArray = new Array(columns);
  for (let i = 0; i < resultArray.length; i += 1) {
    const nestedArray = new Array(rows);
    for (let j = 0; j < nestedArray.length; j += 1) {
      nestedArray[j] = type === 'random' ? Math.round(Math.random()) : -1;
    }
    resultArray[i] = nestedArray;
  }
  return resultArray;
}

function drawCell(
  i,
  j,
  alive,
  age, // array of ages
  colors,
  context, // canvas context('2d)
  trail, // bool
  cellSpace,
  cellSize
) {
  if (alive) {
    if (age[j][i] > -1) context.fillStyle = colors.alive;
    if (trail && age[j][i] < 0) {
      context.fillStyle = colors.trail;
    }
  } else {
    context.fillStyle = colors.dead;
  }

  context.fillRect(
    cellSpace + cellSpace * i + cellSize * i,
    cellSpace + cellSpace * j + cellSize * j,
    cellSize,
    cellSize
  );
}

// function getNeighboursFromAlive(x, y, i, possibleNeighboursList, actualState) {
//   let neighbours = 0;
//   let k;

//   let topPointer = 1;
//   let middlePointer = 1;
//   let bottomPointer = 1;

//   // Top
//   if (actualState[i - 1] !== undefined) {
//     if (actualState[i - 1][0] === y - 1) {
//       for (k = topPointer; k < actualState[i - 1].length; k += 1) {
//         if (actualState[i - 1][k] >= x - 1) {
//           if (actualState[i - 1][k] === x - 1) {
//             possibleNeighboursList[0] = undefined;
//             topPointer = k + 1;
//             neighbours += 1;
//           }

//           if (actualState[i - 1][k] === x) {
//             possibleNeighboursList[1] = undefined;
//             topPointer = k;
//             neighbours += 1;
//           }

//           if (actualState[i - 1][k] === x + 1) {
//             possibleNeighboursList[2] = undefined;

//             if (k === 1) {
//               topPointer = 1;
//             } else {
//               topPointer = k - 1;
//             }

//             neighbours += 1;
//           }

//           if (actualState[i - 1][k] > x + 1) {
//             break;
//           }
//         }
//       }
//     }
//   }

//   // Middle
//   for (k = 1; k < actualState[i].length; k += 1) {
//     if (actualState[i][k] >= x - 1) {
//       if (actualState[i][k] === x - 1) {
//         possibleNeighboursList[3] = undefined;
//         neighbours += 1;
//       }

//       if (actualState[i][k] === x + 1) {
//         possibleNeighboursList[4] = undefined;
//         neighbours += 1;
//       }

//       if (actualState[i][k] > x + 1) {
//         break;
//       }
//     }
//   }

//   // Bottom
//   if (actualState[i + 1] !== undefined) {
//     if (actualState[i + 1][0] === y + 1) {
//       for (k = bottomPointer; k < actualState[i + 1].length; k += 1) {
//         if (actualState[i + 1][k] >= x - 1) {
//           if (actualState[i + 1][k] === x - 1) {
//             possibleNeighboursList[5] = undefined;
//             bottomPointer = k + 1;
//             neighbours += 1;
//           }

//           if (actualState[i + 1][k] === x) {
//             possibleNeighboursList[6] = undefined;
//             bottomPointer = k;
//             neighbours += 1;
//           }

//           if (actualState[i + 1][k] === x + 1) {
//             possibleNeighboursList[7] = undefined;

//             if (k === 1) {
//               bottomPointer = 1;
//             } else {
//               bottomPointer = k - 1;
//             }

//             neighbours += 1;
//           }

//           if (actualState[i + 1][k] > x + 1) {
//             break;
//           }
//         }
//       }
//     }
//   }

//   return neighbours;
// }

// function removeCell(x, y, state) {
//   let i;
//   let j;

//   for (i = 0; i < state.length; i += 1) {
//     if (state[i][0] === y) {
//       if (state[i].length === 2) {
//         // Remove all Row
//         state.splice(i, 1);
//       } else {
//         // Remove Element
//         for (j = 1; j < state[i].length; j += 1) {
//           if (state[i][j] === x) {
//             state[i].splice(j, 1);
//           }
//         }
//       }
//     }
//   }
// }

// function addCell(x, y, state) {
//   if (state.length === 0) {
//     state.push([y, x]);
//     return;
//   }

//   let k;
//   let n;
//   let m;
//   let tempRow;
//   let newState = [];
//   let added;

//   if (y < state[0][0]) {
//     // Add to Head
//     newState = [[y, x]];
//     for (k = 0; k < state.length; k += 1) {
//       newState[k + 1] = state[k];
//     }

//     for (k = 0; k < newState.length; k += 1) {
//       state[k] = newState[k];
//     }
//   } else if (y > state[state.length - 1][0]) {
//     // Add to Tail
//     state[state.length] = [y, x];
//   } else {
//     // Add to Middle

//     for (n = 0; n < state.length; n += 1) {
//       if (state[n][0] === y) {
//         // Level Exists
//         tempRow = [];
//         added = false;
//         for (m = 1; m < state[n].length; m += 1) {
//           if (!added && x < state[n][m]) {
//             tempRow.push(x);
//             added = !added;
//           }
//           tempRow.push(state[n][m]);
//         }
//         tempRow.unshift(y);
//         if (!added) {
//           tempRow.push(x);
//         }
//         state[n] = tempRow;
//         return;
//       }

//       if (y < state[n][0]) {
//         // Create Level
//         newState = [];
//         for (k = 0; k < state.length; k += 1) {
//           if (k === n) {
//             newState[k] = [y, x];
//             newState[k + 1] = state[k];
//           } else if (k < n) {
//             newState[k] = state[k];
//           } else if (k > n) {
//             newState[k + 1] = state[k];
//           }
//         }

//         for (k = 0; k < newState.length; k += 1) {
//           state[k] = newState[k];
//         }

//         return;
//       }
//     }
//   }
// }

export {
  //   switchCell,
  //   random,
  //   addCell,
  //   removeCell,
  //   mousePosition,
  isAlive,
  drawCell,
  generateAge,
  generateActualState,
  //   getNeighboursFromAlive,
};
