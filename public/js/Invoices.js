class InvoiceTableView extends DefaultTableView {
    constructor(tableId, formId, url) {
        super(tableId, formId, url);
    }

    createTable() {
        this.table.innerHTML = `
        <thead>
            <tr>
                <th>Invoice ID</th>
                <th>Order Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Customer Phone</th>
                <th>Sub Total</th>
                <th>GST</th>
                <th>Total Payable</th>
                <th>Message</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody></tbody>
        `;
    }

    updateTable() {
        this.data.forEach(invoice => {
            console.log(invoice);
            const row = document.createElement('tr');
            const date = new Date(invoice.date);
            const orderNumber = invoice.orders[0].orderID;
            invoice.date = date.toLocaleDateString('en-GB'); // DD/MM/YYYY
            

            row.innerHTML = `<td>${invoice.invoiceID}</td>`;
            row.innerHTML += `<td>${orderNumber}</td>`;
            row.innerHTML += `<td>${invoice.date}</td>`;
            row.innerHTML += `<td>${invoice.time}</td>`;
            row.innerHTML += `<td>${invoice.customerName}</td>`;
            row.innerHTML += `<td>${invoice.customerEmail}</td>`;
            row.innerHTML += `<td>${invoice.customerPhone}</td>`;
            row.innerHTML += `<td>${invoice.subtotal}</td>`;
            row.innerHTML += `<td>${invoice.gst}</td>`;
            row.innerHTML += `<td>${invoice.totalPayable}</td>`;
            row.innerHTML += `<td>${invoice.message}</td>`;

            const statusCell = document.createElement('td');
            const status = document.createElement('span');

            status.textContent = invoice.status;
            if (invoice.status === 'Unpaid') {
                status.classList.add('text-pending');
            }
            else if (invoice.status === 'Paid') {
                status.classList.add('text-done');
            }
            statusCell.appendChild(status);
            row.appendChild(statusCell);

            this.tableBody.appendChild(row);
        });
    }
}

class InvoiceEntryForm extends DefaultEntryForm {
    constructor(formId) {
        super(formId, 'http://localhost:3000/api/invoices');
        // hide the update button
        document.getElementById('btn-update').style.display = 'none';
    }

    createForm() {
        this.form.innerHTML = `
        <div class = "form-group">
            <label for="Order_Number">Order Number:</label>
            <input type="text" class="form-control" id="Order_Number" name="Order_Number">
        </div>
        <div class = "form-group">
            <label for="date">Date:</label>
            <input type="date" class="form-control" id="date" name="date" required>
        </div>
        <div class = "form-group">
            <label for="time">Time:</label>
            <input type="time" class="form-control" id="time" name="time" required>
        </div>
        <div class = "form-group">
            <label for="name">Customer Name:</label>
            <input type="text" class="form-control" id="name" name="name" required minlength="6">
        </div>
        <div class = "form-group">
            <label for="email">Customer Email:</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class = "form-group">
            <label for="phone">Customer Phone:</label>
            <input type="tel" class="form-control" id="phone" name="phone" required>
        </div>
        <div class = "form-group">
            <label for="message">Message:</label>
            <textarea class="form-control" id="message" name="message" rows="4" cols="50"></textarea>
        </div>
        `;
    }

    getData() {
        const orderNumber = document.getElementById('Order_Number').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const customerName = document.getElementById('name').value;
        const customerEmail = document.getElementById('email').value;
        const customerPhone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        return {orderNumber, date, time, customerName,customerEmail,customerPhone, message};
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const invoiceForm = new InvoiceEntryForm('invoice-form');
    const invoiceTable = new InvoiceTableView('invoice-table', 'invoice-form', 'http://localhost:3000/api/invoices');
});

// document.addEventListener('DOMContentLoaded', () => {
//     form = document.getElementById('invoice-form');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const orderNumber = document.getElementById('Order_Number').value;
//         const date = document.getElementById('date').value;
//         const time = document.getElementById('time').value;
//         const customerName = document.getElementById('name').value;
//         const customerEmail = document.getElementById('email').value;
//         const customerPhone = document.getElementById('phone').value;
//         const invoice = {Order_Number: orderNumber, date, time,Customer_Name: customerName, Customer_Email: customerEmail, Customer_Contact_Number: customerPhone, GST, Sub_Total, Total_Payable, message };
//         await fetch('http://localhost:3000/api/invoices', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(invoice),
//         });
//     });
// });
