class FeedbackTableView extends DefaultTableView {
    constructor(tableId, formId) {
        super(tableId, formId, 'http://localhost:3000/api/feedbacks');
    }

    createTable() {
        this.table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Feednack</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
    }

    updateTable() {
        this.data.forEach(feedback => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${feedback.name}</td>
                <td>${feedback.email}</td>
                <td>${feedback.phone}</td>
                <td>${new Date(feedback.date).toLocaleString()}</td>
                <td>${feedback.message}</td>
            `;
            this.table.querySelector('tbody').appendChild(row);
        });
    }
}

class FeedbackEntryForm extends DefaultEntryForm {
    constructor(formId) {
        super(formId, 'http://localhost:3000/api/feedbacks');

        // hide update button
        document.getElementById('btn-update').style.display = 'none';
    }

    createForm() {
        this.form.innerHTML = `
        <div class = "form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" >
        </div>
        <div class = "form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" name="email">
        </div>
        <div class = "form-group">
            <label for="phone">Phone:</label>
            <input type="tel" class="form-control" id="phone" name="phone">
        </div>
        <div class = "form-group">
            <label for="message">Feedback</label>
            <textarea class="form-control" id="message" name="message" rows="4" cols="50"></textarea>
        </div>
        `;
    }

    getData() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        return {name, email, phone, message,};
    }
}

class BarChart {
    constructor(elementId,seriesName,color) {
        this.elementId = elementId;
        this.seriesName = seriesName;
        this.color = color;
        this.chart = null;
    }

    fetchData(url, transformData) {
        fetch(url)
            .then(response => response.json())
            .then(orders => {
                const data = transformData(orders);
                const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
                const categories = sortedData.map(item => item[0]);
                const series = sortedData.map(item => item[1]);
                this.createChart(categories, series);
            })
            .catch(error => console.error('Error:', error));
    }

    createChart(categories, series) {
        console.log(this.seriesName);
        this.chart = new ApexCharts(document.querySelector(`#${this.elementId}`), {
            chart: {
                type: 'bar',
                height: 350,
                horizontal: true,
            },
            series: [{
                name: this.seriesName,
                data: series
            }],
            colors: [this.color],
            xaxis: {
                categories: categories,
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },
        });

        this.chart.render();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const feedbackEntryForm = new FeedbackEntryForm('feedback-form');
    const feedbackTableView = new FeedbackTableView('feedback-table', 'feedback-form');

    const calculateItemCounts = orders => {
        const itemCounts = {};
    
        for (const order of orders) {
            for (const item of order.orderItems) {
                const key = `${item.name}: ${item.id}`;
                if (!itemCounts[key]) {
                    itemCounts[key] = 0;
                }
                itemCounts[key]++;
            }
        }
    
        return itemCounts;
    };
    
    const calculateItemSales = orders => {
        const itemSales = {};
    
        for (const order of orders) {
            for (const item of order.orderItems) {
                const key = `${item.name}: ${item.id}`;
                if (!itemSales[key]) {
                    itemSales[key] = 0;
                }
                itemSales[key] += item.price;
            }
        }
    
        return itemSales;
    };
    
    const orderChart = new BarChart('order-chart', 'Orders','#007BFF');
    orderChart.fetchData('http://localhost:3000/api/orders',calculateItemCounts);

    const salesChart = new BarChart('sales-chart', 'Sales (AU$)','#ff9d00');
    salesChart.fetchData('http://localhost:3000/api/orders', calculateItemSales);
});