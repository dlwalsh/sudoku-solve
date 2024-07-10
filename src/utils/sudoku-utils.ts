function indexToRow(index: number, base: number = 3): number {
  return Math.floor(index / base ** 2);
}

function indexToColumn(index: number, base: number = 3): number {
  return index % base ** 2;
}

function indexToRegion(index: number, base: number = 3): number {
  const band = Math.floor(index / base ** 3); // e.g. top=0, middle=1, bottom=2
  const stack = Math.floor((index % base ** 2) / base); // e.g. left=0, center=1, right=2

  return base * band + stack;
}

function rowCoordinatesToIndex(
  [row, cell]: [number, number],
  base: number = 3
): number {
  return base ** 2 * row + cell;
}

function columnCoordinatesToIndex(
  [column, cell]: [number, number],
  base: number = 3
): number {
  return base ** 2 * cell + column;
}

function regionCoordinatesToIndex(
  [region, cell]: [number, number],
  base: number = 3
): number {
  return (
    base ** 3 * Math.floor(region / base) +
    base * (region % base) +
    base ** 2 * Math.floor(cell / base) +
    (cell % base)
  );
}

function calculatePotentialValues(
  permittedValues: number[],
  allocatedValues: number[]
): number[] {
  return permittedValues.filter((val) => !allocatedValues.includes(val));
}

export {
  indexToRow,
  indexToColumn,
  indexToRegion,
  calculatePotentialValues,
  rowCoordinatesToIndex,
  columnCoordinatesToIndex,
  regionCoordinatesToIndex,
};
