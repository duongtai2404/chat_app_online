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

const URI =
  'mongodb+srv://admin:49PZTw3ndLqKv3p5@cluster0.99r7z.mongodb.net/chatAppOnline?retryWrites=true&w=majority';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/friend', isAuth, friendRoute);
app.use('/people', isAuth, peopleRoute);
app.use('/chat', isAuth, chatRoute);
app.get('/', (req, res) => {
  console.log('get');
  res.send('Hello world');
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
      console.log(`Server in running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
