/**
 * TODO
 * *Add dollar sign to input
 * *add create() function
 * */ 


// Allowing only numbers and decimal point as input
function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode === 46 && $input.val().includes('.')) return false;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}

const create = () => {
    let $name = $('#envelope-name');
    let $bal = $('#starting-balance');

}