import express, {
  Application,
  Request,
  Response,
  NextFunction,
  request,
  response,
} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config();

const https = require('https');


import Twilio from 'twilio';
// Twilio:

var accountSid = process.env.accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.authToken; // Your Auth Token from www.twilio.com/console

const client = Twilio(accountSid, authToken);

const app: Application = express();
const port = 5000;

let phoneBook = new Map();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request: Request, response: Response) => {
  response.send('HELLO THERE!');
});

app.post('/addPhoneNumber', (request: Request, response: Response) => {
  let { id, phoneNumber } = request.body;
  phoneBook.set(id, phoneNumber);
  console.log(phoneBook);
  response.sendStatus(200);
});

app.get('/phoneNumber/:id', (request: Request, response: Response) => {
  const id = request.params.id;
  response.status(200).send(phoneBook.get(id));
});

app.get('/sendMessage', async (request: Request, response: Response) => {
  const message = await client.messages.create({
    body: 'Hello from Node',
    to: '+15148859244', // Text this number
    from: '+16672398875', // From a valid Twilio number
  });
  response.sendStatus(200);
});


app.get('/newsfeed', async (request: Request, response: Response) => {
  var options = {
    method: 'GET',
    hostname: 'api.twitter.com',
    path: '/1.1/search/tweets.json?q=%23covid',
    headers: {
      Authorization: 'Bearer ' + process.env.bearerToken,
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res: any) {
    let chunks: any[] = [];

    res.on('data', function (chunk: any) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk: any) {
      const body: any = Buffer.concat(chunks);
      let resBody: { statuses: any[] } = JSON.parse(body.toString());

      const parsedBody = resBody.statuses.map((tweet: any) => {
        return {
          body: tweet.text,
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          image: tweet.user.profile_image_url,
          created_at: tweet.created_at,
        };
      });
      response.status(200).send({ tweets: parsedBody });
    });

    res.on('error', function (error: any) {
      console.error(error);
    });
  });
  req.end();
});

app.listen(port, () => console.log('Server running on port '));
