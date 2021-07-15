import { CellValue, generateMatrix, Matrix as MathMatrix } from '@matrices/common';
import { Subject } from 'rxjs';

interface MatrixConstructorOptions {
  unresizable?: boolean;
  readonly?: boolean;
  defaultCells?: MathMatrix;
}

/**
 * Contains all of the logic for working with a matrix.
 * This is the equivalent of the other frameworks' `useMatrix`.
 */
export class Matrix {
  private cellsSubject: Subject<MathMatrix>;
  private _cells!: MathMatrix;
  public unresizable: boolean;
  public readonly: boolean;

  public gridRef: HTMLDivElement | null = null;

  constructor({
    unresizable = false,
    readonly = false,
    defaultCells = generateMatrix(2, 2)
  }: MatrixConstructorOptions = {}) {
    this.cellsSubject = new Subject<MathMatrix>();
    this.cellsSubject.subscribe(cells => (this._cells = cells));
    this.cellsSubject.next(defaultCells);

    this.unresizable = unresizable;
    this.readonly = readonly;
  }

  get cells() {
    return this._cells;
  }
  set cells(cells: MathMatrix) {
    this.cellsSubject.next(cells);
  }

  setCell(i: number, j: number, value: CellValue) {
    const cells = this.cells;
    cells[i][j] = value;
    this.cellsSubject.next(cells);
  }

  get numRows() {
    return this.cells.length;
  }
  set numRows(newNumRows: number) {
    this.cellsSubject.next(
      generateMatrix(newNumRows, this.numColumns, (i, j) => this.cells[i]?.[j] ?? null)
    );
  }

  get numColumns() {
    return this.cells[0].length;
  }
  set numColumns(newNumColumns: number) {
    this.cellsSubject.next(
      generateMatrix(this.numRows, newNumColumns, (i, j) => this.cells[i]?.[j] ?? null)
    );
  }

  clear() {
    this.cellsSubject.next(generateMatrix(this.numRows, this.numColumns));
  }

  setFocus(i: number, j: number): void {
    if (i < 0 || j < 0 || i > this.numRows - 1 || j > this.numColumns - 1) {
      return;
    }
    const el = this.gridRef;

    const position = i * this.numColumns + j; //equivalent to element in pos (i, j) in the grid
    const cells = el ? Array.from(el.children) : null;
    const input = cells?.[position]?.querySelector('input') as HTMLInputElement | undefined;

    const focusedElement = el?.querySelector('*:focus') as HTMLInputElement | undefined;
    if (focusedElement && input) {
      const focusPosition = cells!.indexOf(focusedElement.parentElement!);
      const focusColumn = focusPosition % this.numColumns;
      if (j > focusColumn) {
        // The focus was moved right; set the caret position to 0 (the leftmost position)
        input.setSelectionRange(0, 0);
      } else if (j < focusColumn) {
        //The focus was moved left; set the caret position to the last position of the new input (the rightmost position)
        const maxPosition = input.value.length;
        input.setSelectionRange(maxPosition, maxPosition);
      } else {
        //(j === focusColumn)
        // Iff the focus is not changed horizontally:
        // Set the caret position in the element to be focused equal to the current caret position
        // (this is expected behaviour), then focus it.
        const caretPosition = focusedElement.selectionStart;

        input.setSelectionRange(caretPosition, caretPosition);
      }

      input.focus();
    }
  }

  get cellsObserver() {
    return this.cellsSubject.asObservable();
  }
}
