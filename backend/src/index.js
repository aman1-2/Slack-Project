import express from 'express';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import mailer from './config/mailConfig.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(200).json({
    message: 'Testing the Server. A Ping Route.'
  });
});

app.listen(PORT, async () => {
  console.log('Started the server at Port:', PORT);
  connectDB();

  const mailResponse = await mailer.sendMail({
    from: 'amanpratapsinghh12@gmail.com',
    to: 'amanpratapsinghh12@gmail.com',
    subject: "Welcome mail",
    text: "Welcome to the application"
  });

  console.log(mailResponse);
});