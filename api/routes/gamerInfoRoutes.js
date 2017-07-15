module.exports = (app) => {
    let gamerInfo = require('../controllers/gamerInfoController.js');

    // gamerInfo routes
    app.route('/gamerInfo')
       .post(gamerInfo.sign_in);
}