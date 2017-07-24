let manifest = require('./manifest.service');

module.exports = (activities) => {
  return new Promise( (resolve, reject) => {
    let hashes = activities.map((activity) => { return activity.activityHash });
    let table = 'DestinyActivityDefinition';

    // match activity to result record
    function matchToHash(activity) {
        return activity.activityHash === this.activityHash;
    }

    // resolve if reattachToActivity is completed
    function checkToResolve(counter, arrayLength) {
        if ( (counter + 1) === arrayLength ) {
           resolve(JSON.stringify(activities)); 
        }
    }

    // attach json query info to item object
    let reattachToActivity = (activities, results ) => {
        var counter = 0;
        results.forEach((result, index) => {
           let activity = activities.find(matchToHash, result);
           activity.json = result;
           counter++
           checkToResolve(counter, activities.length) 
        })
    }

    // query DB for item info
    manifest.queryManifest(table, hashes)
        .then((results) => {
            reattachToActivity(activities, results);
        })
  })
}