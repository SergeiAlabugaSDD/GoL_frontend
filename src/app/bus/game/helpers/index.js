/* eslint-disable no-bitwise */
// helper
function shortUUID() {
  return 'xxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateGrid(columns, rows) {
  const resultArray = new Array(columns);
  for (let i = 0; i < resultArray.length; i += 1) {
    const nestedArray = new Array(rows);
    for (let j = 0; j < nestedArray.length; j += 1) {
      nestedArray[j] = 0;
    }
    resultArray[i] = nestedArray;
  }
  return resultArray;
}

export { shortUUID, generateGrid };
