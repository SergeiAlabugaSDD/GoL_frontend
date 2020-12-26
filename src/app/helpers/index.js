// helper

function setTheme(property, value) {
  document.body.style.setProperty(property, value);
  return undefined;
}

function requestFullscreen(ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  }
  return undefined;
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }

  return undefined;
}

function universalSyncThunk(arrOfActions, arrOfPayloads) {
  return (dispatch) => {
    arrOfActions.forEach((action, index) =>
      dispatch(action(arrOfPayloads[index]))
    );
  };
}

function create2DArray(x, y, type, arrayOfPattern) {
  // x = columns, y = rows
  const res = [];
  for (let i = 0; i < x; i += 1) {
    const nested = new Uint8Array(y);
    for (let j = 0; j < y; j += 1) {
      nested[j] = type === 'random' ? Math.round(Math.random()) : 0;
    }
    res[i] = nested;
  }
  if (Array.isArray(arrayOfPattern)) {
    arrayOfPattern.forEach((item) => {
      // item = [index of row, index of column]
      res[item[1]][item[0]] = 1;
    });
  }
  return res;
}

export {
  setTheme,
  exitFullscreen,
  requestFullscreen,
  universalSyncThunk,
  create2DArray,
};
