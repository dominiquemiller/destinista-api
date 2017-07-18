let getSummary = require('../services/gamersummary.service');
let request = require('request');
const APIKEY = process.env.BUNGIE;

exports.sign_in = (req, res) => {
  let gamer = req.body;

  const memberIdUrl = `http://www.bungie.net/Platform/Destiny/${gamer.network}/Stats/GetMembershipIdByDisplayName/${gamer.tag}/`; 

    // api request options
    const options = {
                      method: 'GET',
                      url: memberIdUrl,
                      headers: {
                        "X-API-Key": APIKEY
                      }
                    }
    // api call to get membershipId
    request(options, (error, response, body) => {
        if (error) {
          res.send(error);
        } else {
          res.send(body);
        }
        
    })
};

exports.gamer_summary = (req, res) => {
  let gamer = req.body;

  getSummary(gamer.network, gamer.membershipId, APIKEY)
    .then(res.send(body))
    .catch(res.send(error));
};