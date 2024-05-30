document.addEventListener('DOMContentLoaded', () => {
    // get all menu items
    fetch('http://localhost:3000/api/menu')
        .then(response => response.json())
        .then(menuItems => {
            const menuTable = document.getElementById('menu-table').getElementsByTagName('tbody')[0];

            // create table rows for each menu item
            menuItems.forEach(menuItem => {
                const menuItemRow = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = menuItem.id;
                menuItemRow.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = menuItem.name;
                menuItemRow.appendChild(nameCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = menuItem.description;
                menuItemRow.appendChild(descriptionCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = menuItem.price;
                menuItemRow.appendChild(priceCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = menuItem.category;
                menuItemRow.appendChild(categoryCell);

                menuTable.appendChild(menuItemRow);
            });
        });

    // add menu item
    const form = document.getElementById('menu-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('id').value
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const menuItem = {id, name, price, description, category};
        await fetch('http://localhost:3000/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuItem),
        });
    });
})