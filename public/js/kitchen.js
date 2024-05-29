document.addEventListener('DOMContentLoaded', () => {
    loadPendingOrders();
});

function loadPendingOrders() {
    const pendingOrders = document.getElementById('order-container');
    fetch('http://localhost:3000/api/orders?status=Pending')
        .then(response => response.json())
        .then(orders => {
            orders.forEach(order => {
                console.log(order);
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
                            <button type="button" class="btn btn-success">Mark Done</button>
                        </div>
                    </div>`;
            });
        });
}

