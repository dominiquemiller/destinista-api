module.exports = (app) => {
    let gamerInfo = require('../controllers/gamerInfoController.js');

    // gamerInfo routes
    app.route('/sign_in')
       .post(gamerInfo.sign_in);
}