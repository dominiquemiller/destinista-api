module.exports = (app) => {
    let gamerInfo = require('../controllers/gamerInfo.controller');
    let character = require('../controllers/character.controller');

    // gamerInfo routes
    app.route('/sign_in')
       .post(gamerInfo.sign_in);

    app.route('/gamer_summary')
       .post(gamerInfo.gamer_summary);
    
    // character routers
    app.route('/inventory')
       .post(character.inventory);
    
    app.route('/item')
       .post(character.inventoryItem);

    app.route('/progression')
       .post(character.progression);
    
}