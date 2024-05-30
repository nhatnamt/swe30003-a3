document.addEventListener('DOMContentLoaded', () => {
    form = document.getElementById('reservation-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;

        const reservation = { name, email, phone, date, time, guests, message };
        await fetch('http://localhost:3000/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservation),
        });
    });
});