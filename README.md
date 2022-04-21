# envelope-budget

## Codecademy project for an envelope budgeting style API 

### Basic Instructions: 
1. You are probably using this while running the frontend and backend on local servers (see below: 'Known Issues'). If you did not uncomment the sample envelopes or make them yourself (see below: 'Backend'), the site will load without any existing envelopes.
2. Use  the "Create Envelope" section to create an envelope with a starting balance. The envelope will appear in the "Budget Envelopes" section.
3. Click on any envelope to open it and bring up associated actions:
- Debit
- Credit
- Transfer
- Delete
4. Transfering can be done to or from any account regardless of which envelope you originally opened.

### Backend
*made with Express and Node*

The back end is currently hosted on AWS but I currently can not keep the server running for on-demand testing of the live site. Both the front end and back end can be run locally.

A sample set of envelopes is contained in the code, but commented out. Feel free to uncomment it, or start from scratch and use the `POST` route to start adding envelopes. Sample envelopes can be uncommented either at line 166 in `main.js` or line 119 in `server.js` or line 46 in envelopes.js.

Each route includes friendly console logging for ease of tracing. Morgan is also used as middleware.

Helper functions are found in `envelopes.js` which are used to manipulate the `Envelopes` object. As mentioned, the object is meant to start empty, and the ``POST`` route uses a helper function to create your own envelopes.

**POST**
Adding an envelope uses a function that gives it a default starting value of "0" unless you specify "amount" in the request body object.

Two shape options for `POST`:
```javascript
req.body = {
    "envelope": "string", 
}

req.body = {
    "envelope": "string", 
    "amount": number
}
```

**GET**
Includes `GET` routes for all envelopes, or specific ones.

to `GET` an individual envelope:
```javascript
/:envelope
```
to `GET` all envelopes, simply `GET` 
```javascript
/
```

**PUT**
Includes `PUT` routes for updating envelope balance.
To add or subtract from the envelope balance, specify the category, add an action to the params, and then the amount.

```javascript
/:envelope/:action/?amount=number
```
`action` may only be `debit` or `credit`. Example:

If the balance in the 'utilities' envelope is 100 and we pay out 60 for our internet service, the `PUT` request would look like this...
```javascript
/utilities/debit/?amount=60
```
and then the balance in the 'utilities' envelope would return 40. LEt's also say you overpaid you phone bill last month and they're crediting you 20.
```javascript
/utilities/credit/?amount=20
```
The new balance of 'utilities' would return 60.

**TRANSFER BALANCE**
Includes a special function which will transfer a specified value from one envelope to another. This uses a `POST` route, but takes additional parameters. It is accessed like so:
```javascript
transfer/:from/:to/?amount=number
```
example:
The balance of `groceries` is 300. The balance of `dining` is 150. After this `POST` request...
```javascript
transfer/groceries/dining/?amount=100
```
The balance of `groceries` is now 200 and the balance of `dining` is now 250. It sends back an object with both updated envelopes.

**DELETE**
Includes a `DELETE` route for scrapping an envelope. Simply specify the category in the route:
```javascript
/:category
```

### Frontend
*made with JavaScript/JQuery* 

Currently I have not been able to host the front end on github (https) while making http requests to the back end. Github won't allow it. However the font end will run on a localhost and work with the backend, hosted on AWS. 

*Front end features:* 
- Event listeners for the `Enter` key to press the relevant "Submit" button when a related input field is in focus.
- Live updating/refreshing of sorted envelopes when creating or deleting through a function call GET request after specified action.
- Live updating/refreshing of selected envelope's available balance after credit/debit/transfer actions, via function call GET request.
- Responsive sizing and interactive design.
- Adding and removing of "$" at beginning of monetary inputs when focusing/blurring relevant fields.
- Character limiting when entering a monetary value: will only accept numbers and one decimal point. Length of inputs are also limited to prevent accidents or absurd inputs.

## Known Issues: 

*Currently there are a few bugs which can be addressed in the next update:*
1. Envelopes with a balance of $0 are problematic, whether they were created with a zero balance or as a result of maths. The frontend will still see the envelope but the backend will lose it, resulting in errors.
2. The total of all envelope balances is not restricted to the specified monthly income. No error will result from exceeding the income value. The income field is currently not connected to any functionality.
3. As previously mentioned I have not yet been able to either A) keep an AWS server instance always running or B) fix the fact that I can't make regular http requests out of github. Until then, any real testing or demonstration will have to be done locally. You can uncomment the sample entries as {DESCRIBED ELSEWHERE} or create your own within the code. If anyone has advice for hosting a live project with a backend, feel free to contact me.


