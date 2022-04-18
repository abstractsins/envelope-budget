# envelope-budget

## Codecademy project for an envelope budgeting style API 

### backend  made with Express and Node

A sample set of envelopes is contained in the code {SHOW WHERE}, but commented out. Feel free to uncomment it, or start from scratch and use the `POST` route to start adding envelopes.

Each route includes friendly console logging for ease of tracing. Morgan is also used as middleware.

Helper functions are found in `envelopes.js` which are used to manipulate the `Envelopes` object. As mentioned, the object is meant to start empty, and the ``POST`` route uses a helper function to create your own envelopes.

#### POST
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

#### GET
Includes `GET` routes for all envelopes, or specific ones.

to `GET` an individual envelope:
```javascript
'/:envelope'
```
to `GET` all envelopes, simply `GET` 
```javascript
'/'
```
#### PUT
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

#### TRANSFER BALANCE
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

#### DELETE
Includes a `DELETE` route for scrapping an envelope. Simply specify the category in the route:
```javascript
/:category
```

