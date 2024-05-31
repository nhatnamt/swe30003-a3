class MenuTableView extends DefaultTableView {
    constructor(tableId, formId) {
        super(tableId, formId, 'http://localhost:3000/api/menu');
    }

    createTable() {
        this.table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
    }

    updateTable() {
        this.data.forEach(menuItem => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${menuItem.id}</td>`;
            row.innerHTML += `<td>${menuItem.name}</td>`;
            row.innerHTML += `<td>${menuItem.description}</td>`;
            row.innerHTML += `<td>AU$${menuItem.price}</td>`;
            row.innerHTML += `<td>${menuItem.category}</td>`;

            const actionButton = document.createElement('td');
            actionButton.innerHTML = '<button type="button" class="btn btn-primary btn_view btn-sm mr-1">View</button>';
            actionButton.innerHTML += '<button type="button" class="btn btn-danger btn_remove btn-sm">X</button>';
            row.appendChild(actionButton);

            this.tableBody.appendChild(row);
        });
    }
}

class MenuEntryForm extends DefaultEntryForm{
    constructor(formId) {
        super(formId, 'http://localhost:3000/api/menu');
        this.form = document.getElementById(formId);
    }

    createForm() {
        this.form.innerHTML = `
        <div class = "form-group">
            <label for="id">Item ID:</label>
        <input type="text" class="form-control" id="id" name="ID" required minlength="3">
        </div>
        <div class = "form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" required minlength="3">
        </div>
        <div class = "form-group">
            <label for="price">Price:</label>
            <input type="number" class="form-control" id="price" name="price" required>
        </div>
        <div class = "form-group">
            <label for="description">Description:</label>
            <textarea class="form-control" id="description" name="description" rows="4" cols="50" required></textarea>
        </div>
        <div class = "form-group">
            <label for="category">Category:</label>
            <input type="text" class="form-control" id="category" name="category">
        </div>`;
    }

    getData() {
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        return {id, name, price, description, category};
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuTableView = new MenuTableView('menu-table', 'menu-form');
    const menuEntryForm = new MenuEntryForm('menu-form');
    // // get all menu items
    // fetch('http://localhost:3000/api/menu')
    //     .then(response => response.json())
    //     .then(menuItems => {
    //         const menuTable = document.getElementById('menu-table').getElementsByTagName('tbody')[0];

    //         // create table rows for each menu item
    //         menuItems.forEach(menuItem => {
    //             const menuItemRow = document.createElement('tr');

    //             const idCell = document.createElement('td');
    //             idCell.textContent = menuItem.id;
    //             menuItemRow.appendChild(idCell);

    //             const nameCell = document.createElement('td');
    //             nameCell.textContent = menuItem.name;
    //             menuItemRow.appendChild(nameCell);

    //             const descriptionCell = document.createElement('td');
    //             descriptionCell.textContent = menuItem.description;
    //             menuItemRow.appendChild(descriptionCell);

    //             const priceCell = document.createElement('td');
    //             priceCell.textContent = `AU$${menuItem.price}`;
    //             menuItemRow.appendChild(priceCell);

    //             const categoryCell = document.createElement('td');
    //             categoryCell.textContent = menuItem.category;
    //             menuItemRow.appendChild(categoryCell);

    //             menuTable.appendChild(menuItemRow);
    //         });
    //     });

    // // add menu item
    // const form = document.getElementById('menu-form');
    // form.addEventListener('submit', async (event) => {
    //     event.preventDefault();
    //     const id = document.getElementById('id').value
    //     const name = document.getElementById('name').value;
    //     const price = document.getElementById('price').value;
    //     const description = document.getElementById('description').value;
    //     const category = document.getElementById('category').value;
    //     const menuItem = {id, name, price, description, category};
    //     await fetch('http://localhost:3000/api/menu', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(menuItem),
    //     });
    //     // refresh the page
    //     location.reload();
    // });
})