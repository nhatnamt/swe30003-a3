class DefaultTableView {
    constructor(tableId, formId, route) {
        this.table = document.getElementById(tableId);
        this.form = document.getElementById(formId);
        this.route = route;
        this.data = [];
        this.createTable();
        this.fetchData();

    }

    createTable() {
        throw new Error('You have to implement the method createTable!');
    }

    async fetchData() {
        fetch(this.route)
            .then(response => response.json())
            .then(data => {
                this.data = data;
                this.clearTable();
                this.updateTable();
            });
    }

    clearTable() {
        this.tableBody = this.table.getElementsByTagName('tbody')[0];
        this.tableBody.innerHTML = '';
    }

    updateTable() {
        throw new Error('You have to implement the method updateTable!');
    }

    createActionButton() {
        throw new Error('You have to implement the method createActionButton!');
    }
}

class DefaultEntryForm {
    constructor(formId, route) {
        this.form = document.getElementById(formId);
        this.route = route;
        this.createForm();
        this.createButton();

        // make sure this is bound to the class
        this.handleSubmit = this.handleSubmit.bind(this);
        this.form.addEventListener('submit', this.handleSubmit);

        // update form
        this.handleUpdate = this.handleUpdate.bind(this);
        this.form.querySelector('#btn-update').addEventListener('click', this.handleUpdate.bind(this));
        
        // clear form
        this.form.querySelector('#btn-clear').addEventListener('click', this.handleClear.bind(this));
    }

    createForm() {
        throw new Error('You have to implement the method createForm!');
    }

    getData() {
        throw new Error('You have to implement the method getData!');
    }

    createButton() {
        // submit, update and clear button
        this.form.innerHTML += `<input class="btn btn-primary" type="submit" value="Create">`;
        this.form.innerHTML += `<button type="button" id="btn-update" class="btn btn-primary ml-1">Update</button>`;
        this.form.innerHTML += `<button type="button" id="btn-clear" class="btn btn-secondary float-right">Clear</button>`;
    }

    handleClear() {
        this.form.reset();
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = this.getData();
        const response = await fetch(this.route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            location.reload();
        }
    }

    async handleUpdate(event) {
        event.preventDefault();
        const updateRoute = this.route + '/' + this.form.querySelector('#id').value;
        const data = this.getData();
        const response = await fetch(updateRoute, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            location.reload();
        }
    }
}