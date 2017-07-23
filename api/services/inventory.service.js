let manifest = require('./manifest.service');

module.exports = (items) => {
  return new Promise( (resolve, reject) => {
    let hashes = items.map((item) => { return item.itemHash });
    let table = 'DestinyInventoryItemDefinition';

    manifest.queryManifest(table, hashes)
        .then((items) => {
            resolve(JSON.stringify(items));
        })
  })
}