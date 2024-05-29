document.addEventListener('DOMContentLoaded', () => {
    form = document.getElementById('reservation-form');
    const resTable = document.getElementById('res-table').getElementsByTagName('tbody')[0];

    // get all menu items
    fetch('http://localhost:3000/api/reservations')
        .then(response => response.json())
        .then(resItems => {
            // create table rows for each menu item
            resItems.forEach(resItems => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `<td>${resItems.name}</td>`;
                newRow.innerHTML += `<td>${resItems.phone}</td>`;
                newRow.innerHTML += `<td>${resItems.date.substring(0, 10)}</td>`;
                newRow.innerHTML += `<td>${resItems.time}</td>`;

                // View, edit, remove button
                const actionButton = document.createElement('td');
                actionButton.innerHTML = '<button type="button" class="btn btn-primary btn_view btn-sm mr-1">View</button>';
                actionButton.innerHTML += '<button type="button" class="btn btn-danger btn_remove btn-sm">X</button>';

                newRow.appendChild(actionButton);   
                resTable.appendChild(newRow);
            });
        });
    
    resTable.addEventListener('click', (event) => {
        const name = event.target.parentElement.parentElement.getElementsByTagName('td')[0].textContent;
        if (event.target.classList.contains('btn_remove')) {
           fetch(`http://localhost:3000/api/reservations/${name}`, {
               method: 'DELETE',
           });
            location.reload();
        }
        else if (event.target.classList.contains('btn_view')) {
            // search by name through route
            fetch(`http://localhost:3000/api/reservations/${name}`)
                .then(response => response.json())
                .then(reservation => {
                    document.getElementById('name').value = reservation.name;
                    document.getElementById('phone').value = reservation.phone;
                    document.getElementById('date').value = reservation.date;
                    document.getElementById('time').value = reservation.time;
                });
        }
    });

    // form functions
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
        location.reload();
    });

    // // update
    // form.
});