document.addEventListener('DOMContentLoaded', () => {
    form = document.getElementById('invoice-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const orderNumber = document.getElementById('Order_Number').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const customerName = document.getElementById('name').value;
        const customerEmail = document.getElementById('email').value;
        const customerPhone = document.getElementById('phone').value;
        const invoice = {Order_Number: orderNumber, date, time,Customer_Name: customerName, Customer_Email: customerEmail, Customer_Contact_Number: customerPhone, GST, Sub_Total, Total_Payable, message };
        await fetch('http://localhost:3000/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoice),
        });
    });
});
