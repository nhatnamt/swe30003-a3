class ReservationTableView extends DefaultTableView {
    constructor(tableId, formId) {
        super(tableId, formId, 'http://localhost:3000/api/reservations');

        // bind delete and view buttons
        this.table.addEventListener('click', this.handleTableClick.bind(this));
        // hide update button
        document.getElementById('btn-update').style.display = 'none';
    }

    createTable() {
        this.table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
    }

    updateTable() {
        this.data.forEach(reservation => {
            const row = document.createElement('tr');
            const date = new Date(reservation.date);
            reservation.date = date.toLocaleDateString('en-GB'); // DD/MM/YYYY

            row.innerHTML = `<td>${reservation.name}</td>`;
            row.innerHTML += `<td>${reservation.phone}</td>`;
            row.innerHTML += `<td>${reservation.date}</td>`;
            row.innerHTML += `<td>${reservation.time}</td>`;

            const actionButton = document.createElement('td');
            actionButton.innerHTML = '<button type="button" class="btn btn-primary btn_view btn-sm mr-1">View</button>';
            actionButton.innerHTML += '<button type="button" class="btn btn-danger btn_remove btn-sm">X</button>';
            row.appendChild(actionButton);

            this.tableBody.appendChild(row);
        });
    }

    async handleTableClick(event) {
        const name = event.target.parentElement.parentElement.getElementsByTagName('td')[0].textContent;
        if (event.target.classList.contains('btn_remove')) {
            fetch(`http://localhost:3000/api/reservations/${name}`, {
                method: 'DELETE',
            });
        }
        else if (event.target.classList.contains('btn_view')) {
            // search by name through route
            fetch(`http://localhost:3000/api/reservations/${name}`)
                .then(response => response.json())
                .then(reservation => {
                    const date = new Date(reservation.date);
                    reservation.date = date.toISOString().split('T')[0];  // yyyy-MM-dd
                    document.getElementById('name').value = reservation.name;
                    document.getElementById('phone').value = reservation.phone;
                    document.getElementById('email').value = reservation.email;                   
                    document.getElementById('date').value = reservation.date;
                    document.getElementById('time').value = reservation.time;
                    document.getElementById('guests').value = reservation.guests;
                    document.getElementById('message').value = reservation.specialRequests;
                });
        }
    }
}

class ReservationEntryForm extends DefaultEntryForm {
    constructor(formId) {
        super(formId, 'http://localhost:3000/api/reservations');
    }

    createForm() {
        this.form.innerHTML = `
        <div class = "form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" required minlength="6">
        </div>
        <div class = "form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class = "form-group">
            <label for="phone">Phone:</label>
            <input type="tel" class="form-control" id="phone" name="phone" required>
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
            <label for="guests">Number of Guests:</label>
            <input type="number" class="form-control" id="guests" name="guests" required>
        </div>
        <div class = "form-group">
            <label for="specialRequests">Special Requests:</label>
            <textarea class="form-control" id="message" name="specialRequests" rows="4" cols="50"></textarea>
        </div>
        `;
    }

    getData() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;

        return { name, email, phone, date, time, guests, message };
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const reservationEntryForm = new ReservationEntryForm('reservation-form');
    const reservationTableView = new ReservationTableView('res-table', 'reservation-form');
});