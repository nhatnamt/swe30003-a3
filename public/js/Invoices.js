document.getElementById('Invoice-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const orderId = document.getElementById('OrderNumber').value;
    fetchOrderDetails(orderId);
});

async function fetchOrderDetails(orderId) {
    try {
        console.log(`Fetching order details for order ID: ${orderId}`);
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
            throw new Error('Order not found');
        }
        const order = await response.json();
        console.log('Order details:', order);
        calculateAndDisplayInvoice(order);
        await saveInvoice(order);
        displaySuccessMessage();
    } catch (error) {
        console.error('Error fetching order details:', error);
        alert('Error fetching order details: ' + error.message);
    }
}

function calculateAndDisplayInvoice(order) {
    const GST_RATE = 0.05;
    const subtotal = order.totalAmount / (1 + GST_RATE);
    const gst = subtotal * GST_RATE;
    const total = order.totalAmount;

    const orderItemsDetails = order.orderItems.map(item => 
        `<li>${item.name}: ${item.quantity} x $${item.price.toFixed(2)}</li>`
    ).join('');

    const invoiceDetails = `
        <h3>Invoice</h3>
        <p>Order ID: ${order.orderID}</p>
        <p>Table Number: ${order.tableNumber}</p>
        <p>Status: ${order.status}</p>
        <p>Date: ${new Date(order.date).toLocaleString()}</p>
        <ul>${orderItemsDetails}</ul>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>GST (5%): $${gst.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>
    `;
    document.getElementById('invoice-details').innerHTML = invoiceDetails;
}

async function saveInvoice(order) {
    try {
        const response = await fetch('/api/invoices/create-from-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId: order.orderID })
        });

        if (!response.ok) {
            throw new Error('Failed to save invoice');
        }

        const result = await response.json();
        console.log('Invoice saved:', result);
    } catch (error) {
        console.error('Error saving invoice:', error);
        alert('Error saving invoice: ' + error.message);
    }
}

function displaySuccessMessage() {
    const successMessage = `
        <div class="alert alert-success" role="alert">
            Order fetched and invoice created successfully!
        </div>
    `;
    document.getElementById('invoice-details').insertAdjacentHTML('afterbegin', successMessage);
}
