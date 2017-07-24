let request = require('request');
let inventoryService = require('../services/inventory.service');
let activityService = require('../services/activity.service');
const APIKEY = process.env.BUNGIE;

exports.inventory = (req, res) => {
    const body = req.body;

    let url = `http://www.bungie.net/Platform/Destiny/${body.network}/Account/${body.membershipId}/Character/${body.characterId}/Inventory/Summary/`; 

    // api request options
    let options =   {
                      method: 'GET',
                      url: url,
                      headers: {
                        "X-API-Key": APIKEY
                      }
                    };

    request(options, (error, response, body) => {
        if (error) {
          res.send(error);
        } else {
          let response = JSON.parse(body);
          inventoryService(response.Response.data.items)
             .then((items) => { res.send(items)});
        }
        
    })
}

exports.inventoryItem = (req, res) => {
    const body = req.body;
    // service expects an array of items 
    let items = [];

    let url = `http://www.bungie.net/Platform/Destiny/${body.network}/Account/${body.membershipId}/Character/${body.characterId}/Inventory/${body.itemId}/`; 
    
    // api request options
    let options =   {
                      method: 'GET',
                      url: url,
                      headers: {
                        "X-API-Key": APIKEY
                      }
                    };

    request(options, (error, response, body) => {
        if (error) {
          res.send(error);
        } else {
          let response = JSON.parse(body);
          let item = response.Response.data.item;
          items.push(item);
          inventoryService(items)
             .then((items) => { res.send(items)});
        }
        
    })
}

exports.activityStats = (req, res) => {
    const body = req.body;

    let url = `http://www.bungie.net/Platform/Destiny/Stats/AggregateActivityStats/${body.network}/${body.membershipId}/${body.characterId}/` 
    
    // api request options
    let options =   {
                      method: 'GET',
                      url: url,
                      headers: {
                        "X-API-Key": APIKEY
                      }
                    };

    request(options, (error, response, body) => {
        if (error) {
          res.send(error);
        } else {
          let response = JSON.parse(body);
          activityService(response.Response.data.activities)
             .then((activities) => { res.send(activities)});
        }
        
    })
}

exports.historicalStats = (req, res) => {
    const body = req.body;

    let url = `http://www.bungie.net/Platform/Destiny/Stats/${body.network}/${body.membershipId}/${body.characterId}/`;
    // api request options
    let options =   {
                      method: 'GET',
                      url: url,
                      headers: {
                        "X-API-Key": APIKEY
                      }
                    };

    request(options, (error, response, body) => {
        if (error) {
          res.send(response, error);
        } else {
          res.send(body);
        }
        
    })
}
