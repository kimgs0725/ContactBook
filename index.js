const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const app = express();
const port = 3000;

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
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
app.use(logger('short'));

//Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

// Port setting
app.listen(port, function () {
    console.log('server on, http://localhost:' + port);
});