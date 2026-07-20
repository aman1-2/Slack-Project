import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import bullServerAdapter from './config/bullBoardConfig.js';
import messageSocketHandlers from './controllers/messageSocketController.js';
import channelSocketHandler from './controllers/channelSocketController.js';
import { verifyEmailController } from './controllers/userController.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', apiRouter);
app.use('/ui', bullServerAdapter.getRouter());

app.get('/ping', (req, res) => {
  return res.status(200).json({
    message: 'Testing the Server. A Ping Route.'
  });
});

app.get('/verify/:token', verifyEmailController);

io.on('connection', (socket) => {
  console.log('Web-Socket Connection Successful.', socket.id);

  // setTimeout(() => {
  //   socket.emit('message', "This is a message from the server");
  // }, 3000);

  // socket.on('messageFromClient', (data) => {
  //   console.log("Message from Client : ", data);

  //   io.emit('new message', data.toUpperCase());
  // });

  messageSocketHandlers(io, socket);
  channelSocketHandler(io, socket);
});

server.listen(PORT, async () => {
  console.log('Started the server at Port:', PORT);
  connectDB();
});