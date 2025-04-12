function validatePrice(price) {
    const priceInput = document.getElementById('pricePerLiter');
    const errorMessage = document.getElementById('error-message');
    const calculateBtn = document.getElementById('calculateBtn');

    if (price < 1.72) {
        priceInput.classList.add('input-error');
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Price can't be less than €1.72`;
        calculateBtn.disabled = true;
        return false;
    }
    priceInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    calculateBtn.disabled = false;
    return true;
}

function calculateTotal() {
    const pricePerLiter = parseFloat(document.getElementById('pricePerLiter').value) || parseFloat(document.getElementById('pricePerLiter').placeholder);
    const liters = parseFloat(document.getElementById('liters').value) || parseFloat(document.getElementById('liters').placeholder);
    
    if (!validatePrice(pricePerLiter)) {
        document.getElementById('result').textContent = 'Please fix the errors to calculate';
        return;
    }
    
    const totalCost = (pricePerLiter * liters).toFixed(2);
    document.getElementById('result').textContent = `Total Cost: €${totalCost}`;
}
