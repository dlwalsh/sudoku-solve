import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnswerGenerator } from "./components/answer-generator";
import { SudokuGrid } from "./components/sudoku-grid";
import {
  selectSudokuValues,
  selectNextAnswer,
  setSudokuValue,
  selectSudokuPotentialValues,
} from "./slices/sudoku-slice";
import type { AppDispatch } from "./store";
import "./app.css";

const App = () => {
  const dispatch = useDispatch() as AppDispatch;
  const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(
    undefined
  );
  const values = useSelector(selectSudokuValues);
  const potentialValues = useSelector(selectSudokuPotentialValues);
  const nextAnswer = useSelector(selectNextAnswer);

  const handleGenerate = useCallback(() => {
    if (nextAnswer) {
      dispatch(setSudokuValue(nextAnswer));
      setHighlightedIndex(nextAnswer.index);
    }
  }, [dispatch, nextAnswer]);

  return (
    <div className="app">
      <SudokuGrid
        highlightedIndex={highlightedIndex}
        potentialValues={potentialValues}
        values={values}
      />
      <AnswerGenerator onGenerateAnswer={handleGenerate} />
    </div>
  );
};

export { App };
