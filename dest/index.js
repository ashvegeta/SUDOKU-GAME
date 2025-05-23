"use strict";
// COMMENTS ARE WRITTEN BY ME AND NOT AI :)
// very simple sudoku game (first backend); send info for simple grid on HTML frontend
class SudokuGrid {
    // init grid and hash table
    constructor() {
        this.grid = [];
        this.boxHashTable = new Map();
        for (let i = 0; i < 9; i++) {
            this.grid[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        for (let i = 1; i <= 9; i++) {
            this.boxHashTable.set(i, []);
        }
    }
    // create custom grid
    createCustomGrid(customGrid) {
        if (customGrid.length !== 9 || customGrid.some((row) => row.length !== 9)) {
            throw new Error("Invalid grid size");
        }
        this.grid = customGrid;
        // fill the box hash table
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const val = this.grid[i][j];
                if (val !== 0) {
                    const boxRow = Math.floor(i / 3);
                    const boxCol = Math.floor(j / 3);
                    const boxNo = boxRow * 3 + boxCol + 1;
                    const boxValues = this.boxHashTable.get(boxNo) || [];
                    boxValues.push(val);
                    this.boxHashTable.set(boxNo, boxValues);
                }
            }
        }
    }
    // check if position is filled
    checkPosFilled(row, col) {
        if (this.grid[row][col] !== 0) {
            alert("Position already filled!");
            return true;
        }
        return false;
    }
    // check if the value is already in the row
    checkRow(row, val) {
        if (this.grid[row].includes(val)) {
            alert("Value already exists in the row!");
            return true;
        }
        return false;
    }
    // check if the value is already in the column
    checkCol(col, val) {
        if (this.grid.some((r) => r[col] === val)) {
            alert("Value already exists in the column!");
            return true;
        }
        return false;
    }
    // check if the value is already in the 3x3 box
    checkBox(row, col, val) {
        const boxRow = Math.floor(row / 3);
        const boxCol = Math.floor(col / 3);
        const boxNo = boxRow * 3 + boxCol + 1;
        const boxValues = this.boxHashTable.get(boxNo) || [];
        if (boxValues.includes(val)) {
            alert("Value already exists in the 3x3 box!");
            return true;
        }
        // add value to the box hash table
        boxValues.push(val);
        this.boxHashTable.set(boxNo, boxValues);
        return false;
    }
}
// create a new SudokuGrid instance
const grid = new SudokuGrid();
function sendMove(event) {
    event.preventDefault();
    const rowInput = document.getElementById("rowInput");
    const colInput = document.getElementById("colInput");
    const valInput = document.getElementById("valInput");
    const row = parseInt(rowInput.value, 10) - 1;
    const col = parseInt(colInput.value, 10) - 1;
    const val = parseInt(valInput.value, 10);
    // check if row, cols, and box are valid and not filled
    if (grid.checkPosFilled(row, col))
        return false;
    if (grid.checkRow(row, val))
        return false;
    if (grid.checkCol(col, val))
        return false;
    if (grid.checkBox(row, col, val))
        return false;
    // Update the HTML table
    grid.grid[row][col] = val;
    const table = document.getElementById("sudokuGrid");
    const cell = table.rows[row].cells[col];
    cell.innerText = val.toString();
    return true;
}
