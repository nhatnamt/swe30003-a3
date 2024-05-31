class PaymentModal {
    constructor() {
        this.invoiceID = 0;
        this.totalPayable = 0;
        this.totalPaid = 0;
        this.createModelCont();
        this.createDefaultBody();

        this.createCashBody = this.createCashBody.bind(this);
        this.createCardBody = this.createCardBody.bind(this);
        this.handlePaymentSubmit = this.handlePaymentSubmit.bind(this);
        // Reset the modal body to its default state when the modal is hidden
        $('#payment-modal').on('hidden.bs.modal', this.createDefaultBody.bind(this));
    }

    setDetails(invoiceID, totalPayable, totalPaid) {
        this.invoiceID = parseInt(invoiceID);
        this.totalPayable = parseFloat(totalPayable.substring(3));
        this.totalPaid = parseFloat(totalPaid.substring(3));
    }

    show() {
        //this.createDefaultBody();
        $('#outstanding-amount').text('AU$' + (this.totalPayable - this.totalPaid));
        $('#payment-modal').modal();
    }

    createModelCont() {
        const modalCont = document.createElement('div');
        modalCont.classList.add('modal');
        modalCont.id = 'payment-modal';
        modalCont.innerHTML = `

        <div class="modal-dialog">
        <div class="modal-content">
    
            <div class="modal-header">
            <h4 class="modal-title text">Payment Method</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
    
            <!-- Modal body -->
            <div class="modal-body">
            </div>
    
        </div>
        </div>
        `;
        document.body.appendChild(modalCont);
    }
    
    createDefaultBody() {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <span>Outstanding Amount: </span><span id="outstanding-amount"></span>
            <div class="row mt-3">
                <div class="col">
                    <button type="button" class="btn btn-primary btn-block" id="cash">Cash</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-secondary btn-block" id="card">Card</button>
                </div>
            </div>
        `;

        // Handle the button click
        document.querySelector('#cash').addEventListener('click', this.createCashBody);
        document.querySelector('#card').addEventListener('click', this.createCardBody);
 
    }

    createCashBody() {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div>
                <h4>Cash Payment</h4>
                <p>Enter the payment details</p>
                <form>
                    <div class="form-group">
                        <label for="payment-amount">Payment Amount</label>
                        <input type="number" class="form-control" id="payment-amount" placeholder="Payment Amount">
                    </div>
                    <button type="button" class="btn btn-primary" id="submit-cash-payment">Submit</button>
                </form>
            </div>
        `;
        document.getElementById('submit-cash-payment').addEventListener('click', this.handlePaymentSubmit);
    }

    createCardBody() {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div>
                <h4>Card Payment</h4>
                <p>Enter the card details</p>
                <form>
                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" class="form-control" id="cardNumber" placeholder="Card Number">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="cardExpiry">Expiry Date</label>
                            <input type="text" class="form-control" id="cardExpiry" placeholder="MM/YY">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="cardCVC">CVC</label>
                            <input type="text" class="form-control" id="cardCVC" placeholder="CVC">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="payment-amount">Payment Amount</label>
                        <input type="number" class="form-control" id="payment-amount" placeholder="Payment Amount">
                    </div>
                    <button type="button" class="btn btn-primary" id="submit-card-payment">Submit</button>
                </form>
            </div>
        `;
        const submitButton = document.getElementById('submit-card-payment');
        submitButton.addEventListener('click', this.handlePaymentSubmit);
    }

    handlePaymentSubmit() {
        const paymentAmount = document.getElementById('payment-amount').value;
        console.log(paymentAmount);

        fetch(`http://localhost:3000/api/invoices/${this.invoiceID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentAmount }),
        })
        .then(response => {
            if (response.ok) {
                $('#payment-modal').modal('hide');
            }
        });
    }
}