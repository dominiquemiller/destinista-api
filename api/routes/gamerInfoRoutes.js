module.exports = (app) => {
    let gamerInfo = require('../controllers/gamerInfoController.js');

    // gamerInfo routes
    app.route('/gamerInfo')
       .get(gamerInfo.get_info);
}