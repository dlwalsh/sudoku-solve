import "./sudoku-grid.css";

type AnswerGeneratorProps = {
  onGenerateAnswer: () => void;
};

const AnswerGenerator = ({ onGenerateAnswer }: AnswerGeneratorProps) => (
  <div>
    <p>Click to generate next answer.</p>
    <button type="button" onClick={onGenerateAnswer}>
      Click
    </button>
  </div>
);

export { AnswerGenerator };
