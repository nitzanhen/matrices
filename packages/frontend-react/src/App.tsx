import React from "react";
import Matrix from "./components/Matrix";
import { useMatrix } from "./hooks/useMatrix";

function App() {
  const matrix = useMatrix();

  return (
    <div>
      <Matrix {...matrix.toProps()} ref={matrix.ref} />
    </div>
  );
}

export default App;
