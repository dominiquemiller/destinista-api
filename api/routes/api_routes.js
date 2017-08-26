module.exports = (app) => {
    let gamerInfo = require('../controllers/gamerInfo.controller');
    let character = require('../controllers/character.controller');
    let chatRoom = require('../controllers/chat-room.controller');

    // gamerInfo routes
    app.route('/sign_in')
       .post(gamerInfo.signIn);

    app.route('/gamer_summary')
       .post(gamerInfo.gamerSummary);
    
    // character routers
    app.route('/inventory')
       .post(character.inventory);
    
    app.route('/item')
       .post(character.inventoryItem);

    app.route('/activity_stats')
       .post(character.activityStats);
    
    app.route('/historical_stats')
       .post(character.historicalStats);

    app.route('/chat-room', chatRoom.join);
    
}