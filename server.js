let express = require('express');
let https = require('https');
let app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;
let bodyParser = require('body-parser');
let cors = require('cors');

let origin_url = (environment) => {
   if (environment === 'development') {
       return 'http://localhost:4200'; 
   } else if (environment === 'production') {
       return 'https://destinista.herokuapp.com/';
   }
}
let corsOptions = {
    origin: origin_url(environment),
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/gamerInfoRoutes.js');
// register routes with server
routes(app);

app.listen(port);

console.log(`Destinista API started on port ${port}`, corsOptions);