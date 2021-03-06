let express = require('express');
let app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;
let bodyParser = require('body-parser');
let cors = require('cors');
const io = require('socket.io').listen(app.listen(port));

// load local .env file
if (environment === 'development') {
    var env = require('node-env-file');
    env('./.env');
}

let origin_url = (environment) => {
   if (environment === 'development') {
       return 'http://localhost:4200'; 
   } else if (environment === 'production') {
       return 'https://destinista.herokuapp.com';
   }
}
let corsOptions = {
    origin: origin_url(environment),
    optionsSuccessStatus: 200
};

// express config options
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

const routes = require('./api/routes/api_routes.js');
// register routes with server
routes(app);

//connect to client app
const socketRoutes = require('./api/routes/socket_routes.js');
io.on('connection', (socket) => socketRoutes(socket, io) );  

console.log(`Destinista API started on port ${port}`);

module.exports = app;