// Create the Envelopes object, to be populated by POST requests;
let Envelopes = {};

/* Helper Functions */
// Function to get all Envelopes 
const getAll = () => {
    return Envelopes;
}
// Function to set a budget amount;
const setEnvelope = (category, amount=0) => {
    if (typeof category!=='string' || typeof amount!=='number') return false;
    else Envelopes[category] = amount;
    return true;
};
// Function to get an envelope balance;
const getEnvelope = category => {
    if (typeof category!=='string' || !Envelopes[category]) return false;
    let returnObj = {}
    returnObj[category] = Envelopes[category];
    return returnObj;
}
// Function to delete an envelope;
const deleteEnvelope = category => {
    if (typeof category!=='string') return false;
    delete Envelopes[category];
    return true;
}

// Function to debit/credit an envelope by an amount
const update = (action, category, amount) => {
    let current = getEnvelope(category)[category];
    if (action==='credit') return setEnvelope(category, (current+Number(amount)));
    else if (action==='debit') return setEnvelope(category, (current-Number(amount))); 
}

/* EXPORTS */
module.exports = {
    Envelopes,
    getAll,
    setEnvelope,
    getEnvelope,
    deleteEnvelope,
    update
};

/* THIS SPACE INTENTIONALLY LEFT BLANK
*
*
*
*
*
*
*
OK */