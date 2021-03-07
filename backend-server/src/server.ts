import express,  { Application, Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import * as dotenv from 'dotenv';

dotenv.config();

import Twilio from 'twilio';
// Twilio:

var accountSid = process.env.accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.authToken;   // Your Auth Token from www.twilio.com/console

const client = Twilio(accountSid, authToken);

const app: Application = express();
const port = 5000;

let phoneBook = new Map();
let locationBook = new Map();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (request: Request, response: Response ) => {
    response.send("HELLO THERE!");
});

app.post('/addPhoneNumber', (request:Request, response: Response) => {
    let {id, phoneNumber} = request.body;
    phoneBook.set(id,phoneNumber);
    console.log(phoneBook);
    response.sendStatus(200);
});

app.post('/updateLocation/:id', (request:Request, response: Response) => {
    let id = request.params.id;
    let location = request.body;
    locationBook.set(id, location);
    console.log("(Location, Time): ", locationBook);
    console.log(Date())
    response.sendStatus(200);
});

app.get('/phoneNumber/:id', (request:Request, response: Response) => {
    const id = request.params.id;
    response.status(200).send(phoneBook.get(id));
});

app.get('/sendMessage', async(request: Request, response: Response) => {
    const message = await client.messages.create({
        body: 'Hello from Node',
        to: '+15148859244',  // Text this number
        from: '+16672398875' // From a valid Twilio number
    });
    response.sendStatus(200);
})


app.listen(port, ()=> console.log("Server running on port "));