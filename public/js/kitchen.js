document.addEventListener('DOMContentLoaded', () => {
    loadPendingOrders();

    const orderContainer = document.getElementById('order-container');
    orderContainer.addEventListener('click', event => {
        if (event.target.classList.contains('btn-done')) {
            const orderID = event.target.parentElement.parentElement.querySelector('.card-header').textContent.split(':')[1].trim();
            // convert orderID to number
            markOrderDone(orderID);
        }
    });
});

function loadPendingOrders() {
    const pendingOrders = document.getElementById('order-container');
    fetch('http://localhost:3000/api/orders/Pending')
        .then(response => response.json())
        .then(orders => {
            orders.forEach(order => {
                pendingOrders.innerHTML += `
                    <div class="card m-1" style="width: 18rem;">
                        <h5 class="card-header">Order ID: ${order.orderID}</h5>
                        <ul class="list-group list-group-flush">
                            ${order.orderItems.map(item => `
                                <li class="list-group-item">
                                    ${item.name} <span style="float: right;">x ${item.quantity}</span>
                                </li>
                            `).join('')}
                        </ul>
                        <div class="card-footer">
                            <button type="button" class="btn btn-success btn-done">Mark Done</button>
                        </div>
                    </div>`;
            });
        });
}

function markOrderDone(orderID) {
    fetch(`http://localhost:3000/api/orders/${orderID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Done' })
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            location.reload();
        });
}

