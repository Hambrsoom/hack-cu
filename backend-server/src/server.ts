import express,  { Application, Request, Response, NextFunction, request, response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import * as dotenv from 'dotenv';
import axios from "axios";
import { calculateActiveCases } from "./calculate";
import { IArea } from "./area";


dotenv.config();

import Twilio from 'twilio';
// Twilio:

var accountSid = process.env.accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.authToken;   // Your Auth Token from www.twilio.com/console

const client = Twilio(accountSid, authToken);

const app: Application = express();
const port = 5000;

let phoneBook = new Map();

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


app.get('/locations', async(request:Request, response:Response) => {
    let listOfAreas: IArea[] = [];
    const apiLink = "https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=31b42799-cf70-4c29-832a-37ce2d4ddd0c";
    let sentResponse = await axios.get(apiLink);
    const records = sentResponse.data.result.records;

    records.forEach((record: { [x: string]: any; }) => {
        if (record["Categorie"].match(/\d{2}\s-\s/)){
            const numberOfActiveCases = calculateActiveCases(record["Nb_Cas_Cumulatif"], record["Nb_Retablis_Cumulatif"], record["Nb_Deces_Cumulatif_Total"]);
            let area: IArea = {
                category: record["Categorie"],
                numberOfActiveCases: numberOfActiveCases
            }
            listOfAreas.push(area);
        }
    });
    
    response.sendStatus(200);
})


app.listen(port, ()=> console.log("Server running on port "));