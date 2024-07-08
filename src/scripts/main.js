'use strict';

const table = document.querySelector('table');

const tableHead = table.querySelector('THEAD');
const tableBody = table.querySelector('TBODY');
const notifications = [];

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
    [...table.rows].forEach(row => {
        row.classList.remove('active')
    })
    
    
    if (ev.target.tagName !== 'TD') {
        
        [...table.rows].forEach(row => {
            row.classList.remove('active')
        })
    }
    ev.target.parentElement.classList.add('active');
})

document.addEventListener('click', ev => {
    if (ev.target.parentElement.tagName !== 'TR') {
        [...tableBody.rows].forEach(row => {
            row.classList.remove('active');
        })
    }
})

// adding form:

const form = document.createElement('form');
form.classList.add('new-employee-form');

const nameField = document.createElement('input');
const positionField = document.createElement('input');
const ageInput = document.createElement('input');
const salaryInput = document.createElement('input');

const select = document.createElement('select');
const submitButton = document.createElement('button');
const body = document.body;

body.append(form);

function wrapField(form, input, labelText) {
    const label = document.createElement('label');
    input.classList.add('cell-input');
    input.dataset.qa = `${(labelText).toLowerCase()}`
    label.textContent = `${labelText}`;

    if(labelText.toLowerCase() === 'age' ||
        labelText.toLowerCase() === 'salary'
    ) {
        input.type = 'number';
    }

    label.appendChild(input);
    form.appendChild(label);
}

wrapField(form, nameField, 'Name');
wrapField(form, positionField, 'Position');
wrapField(form, select, 'Office');
wrapField(form, ageInput, 'Age');
wrapField(form, salaryInput, 'Salary');

form.appendChild(submitButton);
submitButton.textContent = 'Save to table';

function insertOption(selectionField, optionText) {
    const option = document.createElement('option');
    option.textContent = `${optionText}`;

    selectionField.appendChild(option);
}

insertOption(select, 'Tokyo');
insertOption(select, 'Singapore');
insertOption(select, 'London');
insertOption(select, 'New York');
insertOption(select, 'Edinburgh');
insertOption(select, 'San Francisco');

submitButton.addEventListener('click', ev => {
    ev.preventDefault();

    const formElements = [...form.elements].slice(0, -1);
    const values = [];

    formElements.forEach(element => {

        if(element.value === '') {
            notify('error', `You should fill your ${element.dataset.qa} first!`);
        }  else if (element.dataset.qa === 'name'
            && element.value.length < 4) {
            notify('error', 'Name should be longer than 4 digits!');
            return;
        } else if (element.dataset.qa === 'age'
            && !isAgeValid(element)) {
            notify('error', 'You should be 18 - 90 years old!');
            return;
        } else {
            values.push(element.value);
        }
        
    })
    
    if (values.length === 5) {
        insertRow(values);
        notify('succes', 'Your info was succesfully added to the table!')
    }

    form.reset();
});

function insertRow(valuesArray) {

    const row = tableBody.insertRow();

    valuesArray.forEach(value => {
        const cell = row.insertCell();

        if (!isNaN(value) && value.length > 3) {
            cell.textContent = formatSalary(value);
        } else {
            cell.textContent = value;
        }
    })

}

function formatSalary(salaryNumber) {
    const formattedNumber = Number(salaryNumber).toLocaleString('en-US');
    return `$${formattedNumber}`;
}

function notify(result, message) {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add('notification');
    notification.classList.add(`${result}`);
    
    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = `${(result.charAt(0).toUpperCase() + result.slice(1))}`;

    const description = document.createElement('p');
    description.textContent = `${message}`;

    notification.appendChild(title);
    notification.appendChild(description);

    body.appendChild(notification);
    notifications.push(notification);

    notifications.forEach((notif, index) => {
        notif.style.top = `${10 + index * 110}px`;
    });

    setTimeout(() => {
        notification.remove(),
        notifications.shift()
    }, 3000);
}

function isAgeValid(element) {
    const age = +element.value;

    return age < 18 ? false : age > 90 ? false : true;
}


