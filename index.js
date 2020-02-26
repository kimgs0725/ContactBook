const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const dburl = 'mongodb+srv://test_username:z1x2c3a4s5d6@cluster0-rd3uc.mongodb.net/test?retryWrites=true&w=majority';

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dburl);
const db = mongoose.connection;

// DB connection
db.once('open', function () {
    console.log('DB connected');
});

db.on('error', function (err) {
    console.error('DB ERROR : ', err);
});

// Other setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

// Port setting
app.listen(port, function () {
    console.log('server on, http://localhost:' + port);
});