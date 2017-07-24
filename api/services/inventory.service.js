let manifest = require('./manifest.service');

module.exports = (items) => {
  return new Promise( (resolve, reject) => {
    let hashes = items.map((item) => { return item.itemHash });
    let table = 'DestinyInventoryItemDefinition';

    // match item to result record
    function matchToHash(item) {
        return item.itemHash === this.itemHash;
    }

    // resolve if reattachToItem is completed
    function checkToResolve(index, arrayLength) {
        if ( (index + 1) === arrayLength ) {
           resolve(JSON.stringify(items)); 
        }
    }

    // attach json query info to item object
    let reattachToItem = (items, results ) => {
        results.forEach((result, index) => {
           let item = items.find(matchToHash, result);
           item.json = result;
           checkToResolve(index, items.length) 
        })
    }

    // query DB for item info
    manifest.queryManifest(table, hashes)
        .then((results) => {
            reattachToItem(items, results);
        })
  })
}