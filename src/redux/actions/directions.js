export function leftTopD(width, height, borders) {
  return borders?
    [[0, 1], [1, 0], [1, 1]] :
    [[height - 1, width - 1], [height - 1, 0], [height - 1, 1], [0, width - 1], [0, 1], [1, width - 1], [1, 0], [1, 1]];
}

export function leftD(width, height, borders) {
  return borders?
    [[-1, 0], [-1, 1], [0, 1], [1, 0], [1, 1]] :
    [[-1, width - 1], [-1, 0], [-1, 1], [0, width - 1], [0, 1], [1, width - 1], [1, 0], [1, 1]];
}

export function rightD(width, height, borders) {
  return borders?
    [[-1, -1], [-1, 0], [0, -1], [1, -1], [1, 0]] :
    [[-1, -1], [-1, 0], [-1, 1 - width], [0, -1], [0, 1 - width], [1, -1], [1, 0], [1, 1 - width]];
}

export function rightTopD(width, height, borders) {
  return borders?
    [[0, -1], [1, -1], [1, 0]] :
    [[height - 1, -1], [height - 1, 0], [height - 1, 1 - width], [0, -1], [0, 1 - width], [1, -1], [1, 0], [1, 1 - width]];
}

export function topD(width, height, borders) {
  return borders?
    [[0, -1], [1, -1], [1, 0], [0, 1], [1, 1]] :
    [[height - 1, -1], [0, -1], [1, -1], [height - 1, 0], [1, 0], [height - 1, 1], [0, 1], [1, 1]];
}

export function bottomD(width, height, borders) {
  return borders?
    [[-1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]] :
    [[-1, -1], [0, -1], [1 - height, -1], [-1, 0], [1 - height, 0], [-1, 1], [0, 1], [1 - height, 1]];
}

export function rightBottomD(width, height, borders) {
  return borders?
    [[-1, -1], [-1, 0], [0, -1]] :
    [[-1, -1], [-1, 0], [-1, 1 - width], [0, -1], [0, 1 - width], [1 - height, -1], [1 - height, 0], [1 - height, 1 - width]];
}

export function leftBottomD(width, height, borders) {
  return borders?
    [[-1, 0], [-1, 1], [0, 1]] :
    [[-1, width - 1], [-1, 0], [-1, 1], [0, width - 1], [0, 1], [1 - height, width - 1], [1 - height, 0], [1 - height, 1]];
}
