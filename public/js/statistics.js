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

// Bar chart
class BarChart {
    constructor(elementId, categories, series) {
        this.chart = new ApexCharts(document.querySelector(`#${elementId}`), {
            chart: {
                type: 'bar',
                height: 350,
                horizontal: true,
            },
            series: [{
                data: series
            }],
            xaxis: {
                categories: categories,
            }
        });

        this.chart.render();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const feedbackEntryForm = new FeedbackEntryForm('feedback-form');
    const feedbackTableView = new FeedbackTableView('feedback-table', 'feedback-form');

    const categories = ['Category 1', 'Category 2', 'Category 3'];
    const series = [400, 430, 448];
    const barChart = new BarChart('chart', categories, series);
});