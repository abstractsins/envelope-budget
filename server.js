const express = require('express');
const app = express();
const morgan = require('morgan');
const envelopeRouter = express.Router();
// const bodyParser = require('body-parser')

const {    
    Envelopes,
    getAll,
    setEnvelope,
    getEnvelope,
    deleteEnvelope,
    update,
} = require('./envelopes');
const { set } = require('express/lib/application');
const { redirect } = require('express/lib/response');

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
// Morgan logging
app.use(morgan('tiny'))
// json body parsing //*not sure i need this
// const jsonParser = bodyParser.json()
// app.use(jsonParser)
// Router
app.use('/', envelopeRouter)
// Param
envelopeRouter.param('category', (req,res,next,cat)=>{
    const envelope = getEnvelope(cat);
    if (envelope){
        req.envelope = envelope;
        req.category = cat;
        next();
    }else{
        res.status(404).send('Category not found!');
        console.log('\n*****Invalid Category')
    }
});
envelopeRouter.param('action', (req,res,next,action)=>{
    req.action = action;
    next();
})

app.get('/', (req,res,next)=>{
    res.status(200).send('Hello world!')
    console.log('\ntest: hello world!')
})

// Listen in on server
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");    
    console.log(`psssst, I'm listening on port ${PORT}, be gentle...`);
});

// GET
// Get all
envelopeRouter.get('/', (req, res, next)=>{
    res.status(200).send(getAll())
    console.log('\n*****Getting all envelopes')
})
// Get individual
envelopeRouter.get('/:category', (req, res, next) => {
    res.status(200).send(req.envelope);
    console.log('\n*****Got envelope - ' + req.category + ': ' + (req.envelope[req.category]));
});

// PUT 
envelopeRouter.put('/:category/:action/', (req,res,next)=>{
    let category = req.category;
    let action = req.action;
    let amount = req.query.amount;
    let updated = update(action, category, amount);
    console.log(updated)
    if (updated) {
        res.status(204).send(updated);
        console.log(`\n*****Envelope updated - ${action} ${req.category}: ${req.query.amount}`)
    } else {
        res.status(404).send('something went wrong')
    }
})

// POST
envelopeRouter.post('/', (req,res,next)=>{
    let category = req.body.envelope;
    let amount = req.body.amount;
    let newEnvelope = setEnvelope(category, amount);
    if (newEnvelope) {
        res.status(201).send(newEnvelope)
        console.log('\n*****Created the envelope - ' + category + ': ' + amount);
    } else {
        res.status(404).send();
    }
})

// DELETE 
envelopeRouter.delete('/:category', (req,res,next)=>{
    const category = req.category;
    const deleted = deleteEnvelope(category);
    if (deleted) {
        res.status(204)
        console.log('\n*****Deleted envelope: ' + category)
    } else {
        res.status(500);
    }
    res.send();    
})

// TEST CALLS
setEnvelope('rent', 1000);
setEnvelope('electric', 50);
setEnvelope('internet', 60);
setEnvelope('groceries', 300);
setEnvelope('gasoline', 100);

/* THIS SPACE INTENTIONALLY LEFT BLANK
*
*
*
*
*
*
*
OK */