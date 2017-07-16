let request = require('request');

module.exports = (network, tag, apiKey) => {
  return new Promise( (resolve, reject) => {
    const options = {
        method: "GET",
        url: `www.bungie.net/Platform/Destiny/${network}/Stats/GetMembershipIdByDisplayName/${tag}/`,
        headers: {
            "X-API-Key": apiKey
        }
     }

    request(options, (error, response, body) => {
        if (error) {
            reject(error);
        } else {
            resolve(body)
        }
        
    })
  })

}