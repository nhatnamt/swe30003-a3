document.addEventListener('DOMContentLoaded', () => {
    const orderTable = document.getElementById('order-table').getElementsByTagName('tbody')[0];
    const addRowButton = document.getElementById('add-row');

    // add row
    addRowButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.innerHTML = '<input type="text" name="id"/>';
        newRow.appendChild(idCell);

        const quantityCell = document.createElement('td');
        quantityCell.innerHTML = '<input type="number" name="quantity"/>';
        newRow.appendChild(quantityCell);

        const notesCell = document.createElement('td');
        notesCell.innerHTML = '<input type="text" name="notes"/>';
        newRow.appendChild(notesCell);

        // remove button
        const removeButton = document.createElement('td');
        removeButton.innerHTML = '<button type="button" class="btn btn-danger btn_remove btn-sm">X</button>';
        newRow.appendChild(removeButton);

        orderTable.appendChild(newRow);
    });

    // remove row
    orderTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn_remove')) {
            event.target.parentElement.parentElement.remove();
        }
    });

    // submit order
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', async () => {
        const id = document.getElementById('order-id');
        const tableNumber = document.getElementById('table-number');
        const status = "Pending";
        const date = new Date();
        const orderItems = [];
        const rows = orderTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const id = row.querySelector('input[name="id"]').value;
            const quantity = row.querySelector('input[name="quantity"]').value;
            const notes = row.querySelector('input[name="notes"]').value;
            orderItems.push({id, name, quantity, notes});
        }
        const order = {orderID: id.value, tableNumber: tableNumber.value, orderItems, status, date};
        await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
    });
});

