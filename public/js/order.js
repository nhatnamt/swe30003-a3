class OrderTableView extends DefaultTableView {
    constructor(tableId, formId) {
        super(tableId, formId, 'http://localhost:3000/api/orders');
    }

    updateTable() {
        this.data.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${order.orderID}</td>`;
            row.innerHTML += `<td>${order.tableNumber}</td>`;
            row.innerHTML += `<td>AU$${order.totalAmount}</td>`;
            row.innerHTML += `<td>${order.date}</td>`;

            const orderStatusCell = document.createElement('td');
            const orderStatus = document.createElement('span');

            orderStatus.textContent = order.status;
            if (order.status === 'Pending') {
                orderStatus.classList.add('text-pending');
            }
            else if (order.status === 'Done') {
                orderStatus.classList.add('text-done');
            }
            orderStatusCell.appendChild(orderStatus);
            row.appendChild(orderStatusCell);

            this.table.appendChild(row);
        });
    }

}

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
        const tableNumber = document.getElementById('table-number');
        const status = "Pending";
        const date = new Date();
        const orderItems = [];
        const rows = orderTable.getElementsByTagName('tr');
        for (let menuItem = 0; menuItem < rows.length; menuItem++) {
            const row = rows[menuItem];
            const menuItemId = row.querySelector('input[name="id"]').value;
            const quantity = row.querySelector('input[name="quantity"]').value;
            const notes = row.querySelector('input[name="notes"]').value;
            orderItems.push({id: menuItemId, quantity, notes});
        }
        const order = {tableNumber: tableNumber.value, orderItems, status, date};
        await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        location.reload();
    });

    const orderTableView = new OrderTableView('recent-orders', 'order-form');
    
    // // load recent orders
    // const recentOrders = document.getElementById('recent-orders');
    // fetch('http://localhost:3000/api/orders')
    //     .then(response => response.json())
    //     .then(orders => {
    //         orders.forEach(order => {
    //             const orderRow = document.createElement('tr');
    //             orderRow.innerHTML = `<td>${order.orderID}</td>`;
    //             orderRow.innerHTML += `<td>${order.tableNumber}</td>`;
    //             orderRow.innerHTML += `<td>AU$${order.totalAmount}</td>`;
    //             orderRow.innerHTML += `<td>${order.date}</td>`;

    //             const orderStatusCell = document.createElement('td');
    //             const orderStatus = document.createElement('span');

    //             orderStatus.textContent = order.status;
    //             if (order.status === 'Pending') {
    //                 orderStatus.classList.add('text-pending');
    //             }
    //             else if (order.status === 'Done') {
    //                 orderStatus.classList.add('text-done');
    //             }
    //             orderStatusCell.appendChild(orderStatus);
    //             orderRow.appendChild(orderStatusCell);

    //             recentOrders.appendChild(orderRow);
    //         });
    //     });
});

