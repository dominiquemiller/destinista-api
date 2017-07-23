let request = require('request');
let inventoryService = require('../services/inventory.service');
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
          
          res.send(body);
        }
        
    })
}
