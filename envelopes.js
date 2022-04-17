// Create the Envelopes object, to be populated by POST requests;
let Envelopes = {};

/* Helper Functions */
// Function to set a budget amount;
const setEnvelope = (category, amount=0) => {
    if (typeof category!=='string' || typeof amount!=='number') return false;
    else Envelopes[category] = amount;
};
// Function to delete an envelope;
const deleteEnvelope = category => {
    if (typeof category!=='string') return false;
    delete Envelopes[category];
}
// Function to debit a budget by an amount;
const debit = (category, amount) => {
    if (typeof category!=='string' || typeof amount!=='number') return false;
    else Envelopes[category] -= amount;
};
// Function to credit a budget by an amount;
const credit = (category, amount) => {
    if (typeof category!=='string' || typeof amount!=='number') return false;
    else Envelopes[category] += amount;
};


// TEST CALLS
setEnvelope('rent', 1150);
setEnvelope('electric'); // should be 0
setEnvelope('gasoline'); // should be 0
setEnvelope('groceries');
setEnvelope('sex', 100);
setEnvelope('skin', 50);
console.log(Envelopes)
setEnvelope('dates', 250)
setEnvelope('car', 2000)
credit('rent', 650);
credit('groceries', 300)
debit('groceries', 50);
console.log(Envelopes)
setEnvelope('rent', 'free'); // should not change the value
setEnvelope('rent', 100); // will change value
deleteEnvelope('gasoline')
deleteEnvelope('electric')
console.log(Envelopes)



/* THIS SPACE INTENTIONALLY LEFT BLANK
*
*
*
*
*
*
*
OK */