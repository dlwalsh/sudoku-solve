import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  indexToRow,
  indexToColumn,
  indexToRegion,
  calculatePotentialValues,
  rowCoordinatesToIndex,
  columnCoordinatesToIndex,
  regionCoordinatesToIndex,
} from "../utils/sudoku-utils";
import type { RootState } from "../store";

type SudokuState = {
  base: number;
  values: number[];
};

const initialState: SudokuState = {
  base: 3,
  // prettier-ignore
  values: [
    0, 8, 0,   7, 0, 4,   0, 0, 0,
    3, 0, 0,   0, 0, 2,   0, 0, 0,
    0, 0, 0,   0, 0, 0,   0, 6, 3,

    6, 0, 0,   0, 0, 0,   3, 0, 8,
    7, 0, 0,   5, 0, 0,   4, 0, 0,
    0, 0, 5,   9, 0, 0,   0, 0, 6,

    2, 3, 0,   0, 8, 0,   1, 0, 0,
    0, 0, 8,   0, 0, 0,   0, 0, 0,
    4, 0, 0,   0, 9, 0,   0, 0, 0,
  ],
};

const {
  reducer: sudokuReducer,
  actions: { setValue: setSudokuValue },
} = createSlice({
  name: "sudoku",
  initialState,
  reducers: {
    setValue(
      state,
      action: PayloadAction<{
        index: number;
        value: number;
      }>
    ) {
      const { index, value } = action.payload;

      state.values[index] = value;
    },
  },
});

const selectSudokuBase = (state: RootState): number => state.sudoku.base;
const selectSudokuValues = (state: RootState): number[] => state.sudoku.values;
const selectSudokuPotentialValues: (state: RootState) => number[][] =
  createSelector(selectSudokuValues, selectSudokuBase, (values, base) => {
    const setup: number[] = Array.from(Array(base ** 2)).map((_, i) => i);
    const rowValues: number[][] = setup.map((i) =>
      setup.map((j) => values[rowCoordinatesToIndex([i, j], base)])
    );
    const columnValues: number[][] = setup.map((i) =>
      setup.map((j) => values[columnCoordinatesToIndex([i, j], base)])
    );
    const regionValues: number[][] = setup.map((i) =>
      setup.map((j) => values[regionCoordinatesToIndex([i, j], base)])
    );

    return Array.from(Array(base ** 4))
      .map((_, i) => i)
      .map((index) => {
        if (values[index] !== 0) {
          return [];
        }

        const row = indexToRow(index, base);
        const column = indexToColumn(index, base);
        const region = indexToRegion(index, base);

        return calculatePotentialValues(
          setup.map((i) => i + 1),
          [...rowValues[row], ...columnValues[column], ...regionValues[region]]
        );
      });
  });

const selectNextAnswer: (
  state: RootState
) => { index: number; value: number } | undefined = createSelector(
  selectSudokuPotentialValues,
  selectSudokuBase,
  (potentialValues, base) => {
    const setup: number[] = Array.from(Array(base ** 2)).map((_, i) => i);
    const rows: number[][] = setup.map((i) =>
      setup.map((j) => rowCoordinatesToIndex([i, j], base))
    );
    const columns: number[][] = setup.map((i) =>
      setup.map((j) => columnCoordinatesToIndex([i, j], base))
    );
    const regions: number[][] = setup.map((i) =>
      setup.map((j) => regionCoordinatesToIndex([i, j], base))
    );

    const nextIndex = potentialValues.findIndex((pot) => pot.length === 1);

    if (nextIndex !== -1) {
      return {
        index: nextIndex,
        value: potentialValues[nextIndex][0],
      };
    }

    for (const group of [...rows, ...columns, ...regions]) {
      const groupPotentials: number[][] = group.map(
        (index) => potentialValues[index]
      );

      for (let value = 1; value <= base ** 2; value += 1) {
        if (groupPotentials.filter((pot) => pot.includes(value)).length === 1) {
          const idx = groupPotentials.findIndex((pot) => pot.includes(value));

          return {
            index: group[idx],
            value,
          };
        }
      }
    }

    return undefined;
  }
);

export {
  sudokuReducer,
  setSudokuValue,
  selectSudokuValues,
  selectSudokuPotentialValues,
  selectNextAnswer,
};
