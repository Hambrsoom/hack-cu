import express,  { Application, Request, Response, NextFunction, request, response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";

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

app.listen(port, ()=> console.log("Server running on port "));