var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

// Swagger configuration
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API to manage Johns Hotel & Soen',
      version: '1.0.0',
      description: 'This is a REST API application made with Express for Johns Hotel & Soen.',
      license: {
        name: 'John has no license',
        url: 'https://nolicence.co.uk.com.dk',
      },
      contact: {
        name: 'John Johnson',
        url: 'https://johnson.dk',
        email: 'john@hotelogsoen.dk',
      },
      servers: [{
        url: 'http://localhost:3000',
        description: 'Development server',
      }, ],
    },
  };

const options = {
    swaggerDefinition,
    apis: ['./routes/**/*.route.js']
}

const swaggerSpec = swaggerJSDoc(options);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json('Error: ' + (err.message || 'Internal server error'));
});

module.exports = app;
