
// Twilio:
var accountSid = 'ACac7e5ad74d5156fa30f5da3ebc12361b'; // Your Account SID from www.twilio.com/console
var authToken = '2611378dfe4012e8944141788212d791';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+15148859244',  // Text this number
    from: '16672398875' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
