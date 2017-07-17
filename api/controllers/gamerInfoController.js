let getSummary = require('../services/gamersummary.service');
const APIKEY = process.env.BUNGIE;

exports.sign_in = (req, res) => {
  let gamer = req.body;

  getSummary(gamer.network, gamer.tag, APIKEY)
    .then( (data) => res.send(data))
    .catch( (error) => res.send(error));
};