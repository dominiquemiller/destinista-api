let request = require('request');

module.exports = (network, tag, apiKey) => {
  return new Promise( (resolve, reject) => {
    const options = {
        method: 'GET',
        url: `http://www.bungie.net/Platform/Destiny/${network}/Stats/GetMembershipIdByDisplayName/${tag}/`,
        headers: {
            "X-API-Key": apiKey
        }
     }

    request(options, (error, response, body) => {
        if (error) {
            reject(error);
        } else {
            const jsonBody = JSON.parse(body)
            summary(network, jsonBody.Response);
        }
        
    })

    let summary = (network, membershipId) => {
        const options = {
            method: 'GET',
            url: `http://www.bungie.net/Platform/Destiny/${network}/Account/${membershipId}/Summary/`,
            headers: {
              "X-API-Key": apiKey
            } 
        }
        console.log(options);
        request(options, (error, response, body) => {
            if (error) {
                reject({ "err": error });
            } else {
                resolve(body);
            }
        
        })
    }


  })

}