let express = require('express');
let https = require('https');
let app = express();
const port = process.env.PORT || 3000;
let bodyParser = require('body-parser');
let cors = require('cors');

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/gamerInfoRoutes.js');
// register routes with server
routes(app);

app.listen(port);

console.log(`Destinista API started on port ${port}`);