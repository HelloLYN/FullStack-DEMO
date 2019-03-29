/* eslint-disable max-len */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const db = require('./config/keys').mongoURI;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** 要加上{useNewUrlParser:true}否则会报以下的错误提醒
 *  DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new    *  parser, pass option { useNewUrlParser: true } to MongoClient.connect.
 */
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

/**
   * passport 中间件
   * 如果这里使用了session,需要用passport.session()
   * app.use(passport.initialize());
     app.use(passport.session());
   */
app.use(passport.initialize());
require('./config/passport')(passport);

// localhost:3000/api/users/test
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`正在监听${port}`));
