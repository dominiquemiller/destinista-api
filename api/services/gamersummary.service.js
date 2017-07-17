let request = require('request');

module.exports = (network, tag, apiKey) => {
  return new Promise( (resolve, reject) => {
    const memberIdUrl = `http://www.bungie.net/Platform/Destiny/${network}/Stats/GetMembershipIdByDisplayName/${tag}/`; 

    // api request options
    let  options= (url, apikey) => { 
        return {
                method: 'GET',
                url: url,
                headers: {
                    "X-API-Key": apiKey
                    }
                }
    };
    // api call to get membershipId
    request(options(memberIdUrl, apiKey), (error, response, body) => {
        if (error) {
            reject(error);
        } else {
            const jsonBody = JSON.parse(body)
            summary(network, jsonBody.Response);
        }
        
    })
    // api call to get account summary
    let summary = (network, membershipId) => {
        const accountUrl = `http://www.bungie.net/Platform/Destiny/${network}/Account/${membershipId}/Summary/`; 

        request(options(accountUrl, apiKey), (error, response, body) => {
            if (error) {
                reject({ "err": error });
            } else {
                resolve(body);
            }
        
        })
    }


  })

}