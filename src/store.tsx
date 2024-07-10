import { configureStore } from "@reduxjs/toolkit";
import { sudokuReducer } from "./slices/sudoku-slice";

const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
