class InvoiceTableView extends DefaultTableView {
    constructor(tableId, formId, url, paymentModal) {
        super(tableId, formId, url);
        this.table.addEventListener('click', this.handleTableClick.bind(this));

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
                <th>Total Paid</th>
                <th>Status</th>
                <th>Actions</th>
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
            row.innerHTML += `<td>AU$${invoice.subtotal}</td>`;
            row.innerHTML += `<td>AU$${invoice.gst}</td>`;
            row.innerHTML += `<td>AU$${invoice.totalPayable}</td>`;
            row.innerHTML += `<td>AU$${invoice.amountPaid}</td>`;

            const statusCell = document.createElement('td');
            const status = document.createElement('span');

            status.textContent = invoice.status;
            if (invoice.status === 'Unpaid') {
                status.classList.add('text-error');
            }
            else if (invoice.status === 'Paid') {
                status.classList.add('text-done');
            }
            statusCell.appendChild(status);
            row.appendChild(statusCell);

            const actionButton = document.createElement('td');
            actionButton.innerHTML = '<button type="button" class="btn btn-primary btn_pay btn-sm mr-1">Pay</button>';
            actionButton.innerHTML += '<button type="button" class="btn btn-danger btn_remove btn-sm">X</button>';
            row.appendChild(actionButton);

            this.tableBody.appendChild(row);
        });
    }

    handleTableClick(event) {
        const invoiceID = event.target.parentElement.parentElement.getElementsByTagName('td')[0].textContent;
        if (event.target.classList.contains('btn_remove')) {
            fetch(`http://localhost:3000/api/invoices/${invoiceID}`, {
                method: 'DELETE',
            });
        }
        else if (event.target.classList.contains('btn_pay')) {
            paymentModal.show();
            // const invoiceID = event.target.parentElement.parentElement.getElementsByTagName('td')[0].textContent;
            // var paidAmount = event.target.parentElement.parentElement.getElementsByTagName('td')[10].textContent;
            // var totalPayable = event.target.parentElement.parentElement.getElementsByTagName('td')[9].textContent;
            // // remove the AU$ prefix
            // paidAmount = parseFloat(paidAmount.substring(3));
            // totalPayable = parseFloat(totalPayable.substring(3));
            // // calculate the outstanding amount
            // const outstandingAmount = totalPayable - paidAmount;

            // // add back the AU$ prefix
            // $('#outstanding-amount').text('AU$' + outstandingAmount);
            // $('#myModal').modal();
            // fetch(`http://localhost:3000/api/invoices/${invoiceID}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ status: 'Paid' }),
            // });
        }
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
class PaymentModal {
    constructor() {
        this.invoiceID = 0;
        this.totalPayable = 0;
        this.totalPaid = 0;
        this.createModelCont();
        this.createDefaultBody();
    }

    setDetails(invoiceID, totalPayable, totalPaid) {
        this.invoiceID = invoiceID;
        this.totalPayable = totalPayable;
        this.totalPaid = totalPaid;
    }

    show() {
        $('#payment-modal').modal();
    }

    createModelCont() {
        const modalCont = document.createElement('div');
        modalCont.classList.add('modal');
        modelCont.id = 'payment-modal';
        modelCont.innerHTML = `

        <div class="modal-dialog">
        <div class="modal-content">
    
            <div class="modal-header">
            <h4 class="modal-title text">Payment Method</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
    
            <!-- Modal body -->
            <div class="modal-body">
            </div>
    
        </div>
        </div>
        `;
    }
    
    createDefaultBody() {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <span>Outstanding Amount: </span><span id="outstanding-amount"></span>
            <div class="row mt-3">
                <div class="col">
                    <button type="button" class="btn btn-primary btn-block" id="cash">Cash</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-secondary btn-block" id="card">Card</button>
                </div>
            </div>
        `;
    }

    createCashBody() {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div>
                <h4>Cash Payment</h4>
                <p>Enter the amount received</p>
                <input type="number" id="cashPaymentAmount" min="0">
                <button type="button" class="btn btn-primary" id="submitCashPayment">Submit</button>
            </div>
        `;
    }

    createCardBody() {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div>
                <h4>Card Payment</h4>
                <p>Enter the card details</p>
                <input type="text" id="cardNumber" placeholder="Card Number">
                <input type="text" id="cardExpiry" placeholder="Expiry Date">
                <input type="text" id="cardCVC" placeholder="CVC">
                <button type="button" class="btn btn-primary" id="submitCardPayment">Submit</button>
            </div>
        `;
    }

}
document.addEventListener('DOMContentLoaded', () => {
    const paymentModal = new PaymentModal();
    const invoiceForm = new InvoiceEntryForm('invoice-form');
    const invoiceTable = new InvoiceTableView('invoice-table', 'invoice-form', 'http://localhost:3000/api/invoices', paymentModal);

    // // Handle the Cash button click
    // document.querySelector('#cash').addEventListener('click', function() {
    //     // Handle cash payment
    //     document.querySelector('.modal-body').innerHTML = `
    //         <div>
    //             <h4>Cash Payment</h4>
    //             <p>Enter the amount received</p>
    //             <input type="number" id="cashPaymentAmount" min="0">
    //             <button type="button" class="btn btn-primary" id="submitCashPayment">Submit</button>
    //         </div>
    //     `;
    // });

    // // Handle the Card button click
    // document.querySelector('#card').addEventListener('click', function() {
    //     // Handle card payment
    //     $('#myModal').modal('hide');
    // });
});