let request = require('request');

module.exports = (network, membershipId, apiKey) => {
  return new Promise( (resolve, reject) => {

    // api request options
    let  options = (url, apikey) => { 
        return {
                method: 'GET',
                url: url,
                headers: {
                    "X-API-Key": apiKey
                    }
                }
    };
    
    // api call to get account summary
    const accountUrl = `http://www.bungie.net/Platform/Destiny/${network}/Account/${membershipId}/Summary/`; 

    request(options(accountUrl, apiKey), (error, response, body) => {
        if (error) {
            reject(error);
        } else {
            resolve(body);
        }
        
    })

  })

}