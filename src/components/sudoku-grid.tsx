import "./sudoku-grid.css";

type SudokuGridProps = {
  highlightedIndex?: number;
  potentialValues: number[][];
  values: number[];
};

const SudokuGrid = ({
  highlightedIndex,
  potentialValues,
  values,
}: SudokuGridProps) => (
  <div className="sudoku-grid">
    {values.map((value, index) => (
      <span
        key={index}
        className="sudoku-grid__cell"
        style={{
          color: index === highlightedIndex ? "red" : undefined,
          fontSize: value === 0 ? 12 : undefined,
        }}
      >
        {value !== 0 ? value : " "}
      </span>
    ))}
  </div>
);

export { SudokuGrid };
