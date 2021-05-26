import React, { useState } from "react";
import Matrix from "./components/Matrix";
import { emptyMatrix } from "./utils";

function App() {
  const [matrix, setMatrix] = useState<(number | undefined)[][]>(
    emptyMatrix(3, 3)
  );
  const addColumn = () => {
    setMatrix(matrix => matrix.map((row) => [...row, undefined]))
  };
  const addRow = () => {
    setMatrix(matrix =>  {
    // Assumption: all rows have the same amount of values.
      const cellsPerRow = matrix[0].length;
      return [...matrix, Array(cellsPerRow).fill(undefined)]
    });
  };
  
  const setCell = (row: number, column: number, value: number | undefined) => {
    setMatrix(matrix => {
      const newMatrix = matrix.map((row) => [...row])
      newMatrix[row][column] = value;

      return newMatrix;
    });
  };

  return (
    <div>
      <Matrix
        matrix={matrix}
        onChange={setCell}
        onAddColumn={addColumn}
        onAddRow={addRow}
      />
    </div>
  );
}

export default App;
