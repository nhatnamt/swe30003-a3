class DefaultTableView {
    constructor(tableId, formId, route) {
        this.table = document.getElementById(tableId);
        this.form = document.getElementById(formId);
        this.route = route;
        this.data = [];
        this.fetchData();
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
        this.table.innerHTML = '';
    }

    updateTable() {
        throw new Error('You have to implement the method updateTable!');
    }
}