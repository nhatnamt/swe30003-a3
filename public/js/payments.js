function showPaymentForm() {
    // Get the order number entered in the first form
    var orderNumber = document.getElementById('orderNumber').value;
    
    // Pre-fill the order number in the payment form
    document.getElementById('orderNumberDisplay').value = orderNumber;
    document.getElementById('TotalPayable').value = 110;
    // Show the payment form
    document.getElementById('paymentForm').classList.remove('hidden');
}