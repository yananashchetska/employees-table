'use strict';

const table = document.querySelector('table');

const tableHead = table.querySelector('THEAD');
const tableBody = table.querySelector('TBODY');


let index = 0;
let asc = false;

const sortTable = (headerIndex, asc = true) => {
    
    const directionModifier = asc ? 1 : -1;
    
    const rows = [...table.rows].slice(1, -1);
    const reg = /\$/;

    rows.sort((rowA, rowB) => {
        let valueA = rowA.cells[headerIndex].textContent.trim();
        let valueB = rowB.cells[headerIndex].textContent.trim();
        
        if (reg.test(valueA)) {
            valueA = checkSalary(valueA);
            valueB = checkSalary(valueB);
        }

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

function checkSalary(salary) {
    return +(salary.replace(/\D/g, ''));
}

// selected functional:



tableBody.addEventListener('click', ev => {
    
    const rows = [...document.querySelectorAll('TR')];

    rows.forEach(row => {
        row.classList.remove('active');
    })

   if (ev.target.parentElement.tagName === 'TR') {
    ev.target.parentElement.classList.add('active');
   }

})