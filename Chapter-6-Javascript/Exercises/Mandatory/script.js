//function that checks if the price is valid (must be >= €1.72)
function validatePrice(price) {
    //get references to HTML elements we need to manipulate
    const priceInput = document.getElementById('pricePerLiter');
    const errorMessage = document.getElementById('error-message');
    const calculateBtn = document.getElementById('calculateBtn');

    //if price is less than 1.72
    if (price < 1.72) {
        //add error styling to input
        priceInput.classList.add('input-error');
        //show error message
        errorMessage.style.display = 'block';
        //set error message text
        errorMessage.textContent = `Price can't be less than €1.72`;
        //disable calculate button
        calculateBtn.disabled = true;
        return false;
    }
    //if price is valid, remove all error states
    priceInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    calculateBtn.disabled = false;
    return true;
}

//function to calculate the total cost
function calculateTotal() {
    //get price and liters values (use placeholder if no value entered)
    const pricePerLiter = parseFloat(document.getElementById('pricePerLiter').value) || parseFloat(document.getElementById('pricePerLiter').placeholder);
    const liters = parseFloat(document.getElementById('liters').value) || parseFloat(document.getElementById('liters').placeholder);
    
    //check if price is valid
    if (!validatePrice(pricePerLiter)) {
        //show error message if price is invalid
        document.getElementById('result').textContent = 'Please fix the errors to calculate';
        return;
    }
    
    //calculate total cost and round to 2 decimal places
    const totalCost = (pricePerLiter * liters).toFixed(2);
    //display result
    document.getElementById('result').textContent = `Total Cost: €${totalCost}`;
}

//check for changes in price input
document.getElementById('pricePerLiter').addEventListener('input', function() {
    //prevent negative values
    if (this.value < 0) this.value = 0;
    //validate new price
    validatePrice(parseFloat(this.value));
});

//check for changes in liters input
document.getElementById('liters').addEventListener('input', function() {
    //prevent negative values
    if (this.value < 0) this.value = 0;
});