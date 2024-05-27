document.addEventListener('DOMContentLoaded', () => {
    form = document.getElementById('invoice-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const Order_Number = document.getElementById('Order_Number').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const Customer_Name = document.getElementById('name').value;
        const Customer_Email = document.getElementById('email').value;
        const Customer_Contact_Number = document.getElementById('phone').value;
        const Invoice = {Order_Number, date, time,Customer_Name, Customer_Email, Customer_Contact_Number, GST, Sub_Total, Total_Payable, message };
        await fetch('http://localhost:3000/api/Incoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Invoice),
        });
    });
});