'use strict';

const table = document.querySelector('table');

const tableHead = table.querySelector('THEAD');
const tableBody = table.querySelector('TBODY');


let index = 0;
let asc = false;

const sortTable = (headerIndex, asc = true) => {
    
    const directionModifier = asc ? 1 : -1;
    
    const rows = [...table.rows].slice(1, -1);
    
    rows.sort((rowA, rowB) => {
        const valueA = rowA.cells[headerIndex].textContent.trim();
        const valueB = rowB.cells[headerIndex].textContent.trim();
        
        return valueA > valueB ? (1 * directionModifier) : (-1 * directionModifier);
    });
    
    return rows; 
}

tableHead.addEventListener('click', ev => {
    asc = !asc;

    const sortingIndex = Array.prototype.indexOf.call(ev.target.parentElement.children, ev.target);
    const sortedRows = sortTable(sortingIndex, asc);

    tableBody.innerHTML = '';

    sortedRows.forEach(row => {
        tableBody.appendChild(row);
    })  
})