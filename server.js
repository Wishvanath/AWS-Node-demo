// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
const fileUpload = require('express-fileupload');


const authRouter = require('./routes/auth');
const dashboardRouter =  require('./routes/dashboard')
const companyProfile = require('./routes/companyProfile')
const landRegistration = require('./routes/landRegistration');
const fileUploadRoute = require('./routes/fileUpload');
const videoUploadRoute = require('./routes/videoUpload')
const locationUploadRoute = require('./routes/locationUpload')
const agentRegistration  = require('./routes/agentRegistration')
const logisticParkRegistration = require('./routes/logisticParkRegistration')
const standAloneWarehouseReg = require('./routes/standAloneWarehouseReg')
const warehouseLParkReg = require('./routes/warehouseLParkReg')
const propertyDetails = require('./routes/propertyDetails')
const updateProperty = require('./routes/updateProperty')

var app = express();

//middleware


app.use(cors())
app.use(express.json()) 
app.use(fileUpload())

app.use('/static', express.static('public'))


app.use(logger('dev'));
app.use(express.json());  //for accessing request body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/auth', authRouter);
app.use('/dashboard',dashboardRouter)
app.use('/', companyProfile)
app.use('/', landRegistration)
app.use('/', fileUploadRoute)
app.use('/', videoUploadRoute)
app.use('/', locationUploadRoute)
app.use('/', agentRegistration)
app.use('/',logisticParkRegistration)
app.use('/',standAloneWarehouseReg)
app.use('/',warehouseLParkReg)
app.use('/',propertyDetails)
app.use('/',updateProperty)


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



module.exports = app;
