let getSummary = require('../services/gamersummary');

exports.sign_in = (req, res) => {
  const APIKEY = process.env.BUNGIE;
  let gamer = req.body;
  res.send(gamer);
  //getSummary(gamer.network, gamer.tag, APIKEY)
    //.then( (data) => res.send(data))
    //.catch( (error) => res.send(error));

};