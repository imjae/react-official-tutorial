export const winnerCheckValue = (boardDataArr, x, y) => {
  const hrizonMatchCheck = horizontalCheck(boardDataArr, x, y);
  const varticalMatchCheck = varticalCheck(boardDataArr, x, y);
  const diagonalMatchCheck = diagonalCheck(boardDataArr, x, y);

  return hrizonMatchCheck || varticalMatchCheck || diagonalMatchCheck
    ? true
    : false;
};

export const horizontalCheck = (boardDataArr, x, y) => {
  // 수평 체크 x축 고정
  let horizontalLength = boardDataArr[x].length;
  for (let i = 0; i < horizontalLength - 1; i++) {
    if (
      boardDataArr[x][i] !== boardDataArr[x][i + 1] ||
      boardDataArr[x][i] === null
    ) {
      return false;
    }
  }
  return true;
};

export const varticalCheck = (boardDataArr, x, y) => {
  // 수직 체크 y축 고정
  let varticalLength = boardDataArr[y].length;
  for (let i = 0; i < varticalLength - 1; i++) {
    if (
      boardDataArr[i][y] !== boardDataArr[i + 1][y] ||
      boardDataArr[i][y] === null
    ) {
      return false;
    }
  }
  return true;
};

export const diagonalCheck = (boardDataArr, x, y) => {
  // 대각선 체크
  const len = boardDataArr.length;
  if (x - y === 0) {
    for (let i = 0; i < len - 1; i++) {
      // \ 모양 대각선 검증
      if (
        boardDataArr[i][i] !== boardDataArr[i + 1][i + 1] ||
        boardDataArr[i][i] === null
      ) {
        return false;
      }
    }
  } else if (x + y === len - 1) {
    // / 모양 대각선 검증
    for (let i = 0; i < len - 1; i++) {
      if (
        boardDataArr[len - 1 - i][i] !== boardDataArr[len - 1 - i - 1][i + 1] ||
        boardDataArr[i][len - 1 - i] === null
      ) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
};