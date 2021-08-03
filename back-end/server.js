const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9000;
const mongoose = require('mongoose');

const isAuth = require('./middlewares/isAuth');

const signupRoute = require('./routes/signup.route');
const loginRoute = require('./routes/login.route');
const friendRoute = require('./routes/friend.route');
const peopleRoute = require('./routes/people.route');
const chatRoute = require('./routes/chat.route');
const chatLineRoute = require('./routes/chatLine.route');
const ioController = require('./controllers/io.controller');

const URI =
  'mongodb+srv://admin:49PZTw3ndLqKv3p5@cluster0.99r7z.mongodb.net/chatAppOnline?retryWrites=true&w=majority';

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.use(cors());
app.use(bodyParser.json());

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/friend', isAuth, friendRoute);
app.use('/people', isAuth, peopleRoute);
app.use('/chat', isAuth, chatRoute);
app.use('/chatLine', isAuth, chatLineRoute);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

ioController(io);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database');
    httpServer.listen(PORT, () => {
      console.log(`Server in running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
