const express = require('express');
const app = express();
const morgan = require('morgan');
const envelopeRouter = express.Router();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
// Morgan logging
app.use(morgan('tiny'))
// json body parsing
const jsonParser = bodyParser.json()
app.use(jsonParser)
// Router
app.use('/', envelopeRouter)

app.get('/', (req,res,next)=>{
    res.status(200).send('Hello world!')
    console.log('\ntest: hello world!')
})

// Listen in on server
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");    
    console.log(`psssst, I'm listening on port ${PORT}, be gentle...`);
});