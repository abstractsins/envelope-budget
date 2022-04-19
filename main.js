/**
 * TODO
 * *Add dollar sign to input
 * *add create() function
 * */ 

/* INPUT VALIDATION */
// Allowing only numbers and decimal point as input
function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode === 46 && $input.val().includes('.')) return false;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}
/* END -- INPUT VALIDATION */

/* TRANSACTION FUNCTIONS */
const create = () => {
    let $name = $('#envelope-name');
    let $bal = $('#starting-balance');
}
const clickEnvelope = category => {
    // JQuery variables;
    let $ops = $('.operations');
    let $header = $('#ops-header-category');
    let $balView = $('.ops-balance-view');
    let $liveBal = $('.live-balance');
    let $credit = $('input#credit-amount');
    let $debit = $('input#debit-amount');
    let $transfer = $('#transfer-amount');
    // Reset the button click state;
    $('li.action').each(function(){$(this).removeClass('active')})
    $('.action-state').each(function(){$(this).removeClass('active')})
    // Reset the input fields
    $credit.val('');
    $debit.val('');
    $transfer.val('');
    // $transfer.value=''
    // Opening the operations section if it's closed;
    if (!$ops.hasClass('active')) $ops.addClass('active')
    // Closing the operations section if the same button is clicked...
    // and switching between envelopes in the operations section;
    else if ($ops.hasClass('active') && $header.text() === category) {
        $ops.removeClass('active');
    } 
    // Giving the operations section a header of the catagory itself;
    $header.text(category)
    category=category.toLowerCase();
    //* Sample envelope balances - comment this out when API is live
    if (category==='rent') $balView.append('<span class="live-balance">$1000</span>');
    else if (category==='cable') $balView.append('<span class="live-balance">$80</span>');
    else if (category==='phone') $balView.append('<span class="live-balance">$55</span>');
    else if (category==='electric') $balView.append('<span class="live-balance">$60</span>');
    // This prevents multiple spans from being added somehow;
    $liveBal.remove()
}
const credit = () => {}
const debit = () => {}
const transfer = () => {}
const deleteEnvelope = () => {}
/* END -- TRANSACTION FUNCTIONS */

/* MODE RADIO BUTTON FUNCTION */
const modeSelect = mode => {
    $('.action-state').each(function(){$(this).removeClass('active')})
    $('li.action').each(function(){$(this).removeClass('active')})
    if (mode==='credit'){
        $('.action-state#credit').addClass('active');
        $('#credit-btn').addClass('active');
    }
    else if (mode==='debit'){
        $('.action-state#debit').addClass('active');
        $('#debit-btn').addClass('active');
    }
    else if (mode==='transfer'){
        $('.action-state#transfer').addClass('active');
        $('#transfer-btn').addClass('active');
    }
    else if (mode==='delete'){
        $('.action-state#delete').addClass('active');
        $('#delete-btn').addClass('active');
    }
}

/* DROPDOWN CATEGORIES */
let $categories = $('.sample-envelope').each(function(){
    let cat = $(this).text();
    let inputStr = '';
    inputStrFrom = '<a onclick="accountSelect(\''+cat+'\', \'from\')">' + cat + '</a>';
    inputStrTo = '<a onclick="accountSelect(\''+cat+'\', \'to\')">' + cat + '</a>';
    $('#from-dropdown').append(inputStrFrom);
    $('#to-dropdown').append(inputStrTo);
});

const accountSelect = (account, direction) => {
    console.log(account,direction)
    if (direction==='to') {
        $('#to-dropbtn').html(account);
        $('#to-dropbtn').css("background-color", "whitesmoke")
        $('#to-dropbtn').css("color", "black")
        $('#to-dropbtn').css("border", "3px solid black")
        $('#to-dropbtn').css("font-weight", "700")
    }
    else if (direction==='from') {
        $('#from-dropbtn').html(account);
        $('#from-dropbtn').css("background-color", "whitesmoke")
        $('#from-dropbtn').css("color", "black")
        $('#from-dropbtn').css("border", "3px solid black")
        $('#from-dropbtn').css("font-weight", "700")
    }
}
/* END --DROPDOWN CATEGORIES */

/* API */
const url = 'https://44.203.14.71:3000/';
const serverData = fetch(url).then(res=>res.json()).then(obj=>{
    return obj.body;
}).catch(err=>{console.error('Something went wrong getting the information!');console.error(err)})
/* END -- API */

