import { Line, Square } from '../types';

export const isLineExists = (
  lines: Line[],
  startX: number,
  startY: number,
  endX: number,
  endY: number
): Line | undefined => {
  return lines.find(
    (line) =>
      (line.startX === startX &&
        line.startY === startY &&
        line.endX === endX &&
        line.endY === endY) ||
      (line.startX === endX &&
        line.startY === endY &&
        line.endX === startX &&
        line.endY === startY)
  );
};

export const checkSquareCompletion = (
  lines: Line[],
  x: number,
  y: number
): boolean => {
  const topLine = isLineExists(lines, x, y, x + 1, y);
  const rightLine = isLineExists(lines, x + 1, y, x + 1, y + 1);
  const bottomLine = isLineExists(lines, x, y + 1, x + 1, y + 1);
  const leftLine = isLineExists(lines, x, y, x, y + 1);

  return !!(topLine && rightLine && bottomLine && leftLine);
};

export const findNewSquares = (
  lines: Line[],
  squares: Square[],
  width: number,
  height: number
): { x: number; y: number }[] => {
  const newSquares: { x: number; y: number }[] = [];

  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const isSquareExists = squares.some(
        (s) => s.topLeftX === x && s.topLeftY === y
      );
      
      if (!isSquareExists && checkSquareCompletion(lines, x, y)) {
        newSquares.push({ x, y });
      }
    }
  }

  return newSquares;
};