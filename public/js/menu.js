document.addEventListener('DOMContentLoaded', () => {
    // get all menu items
    fetch('http://localhost:3000/api/menu')
        .then(response => response.json())
        .then(menuItems => {
            const menuList = document.getElementById('menu-list');
            menuItems.forEach(menuItem => {
                const menuItemElement = document.createElement('li');
                menuItemElement.textContent = menuItem.name;
                menuList.appendChild(menuItemElement);
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