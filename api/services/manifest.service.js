let request = require('request');
let fs = require('fs');
let sqlite = require('sqlite3').verbose();
let SZIP = require('node-stream-zip');
const APIKEY = process.env.BUNGIE;
let manifest = 'https://www.bungie.net/common/destiny_content/sqlite/en/world_sql_content_02a694b624879a1d641d18ee28f53678.content'

let options = {
	url: manifest,
	port: 443,
	method: 'GET',
	encoding: null,
	headers: {
		'Content-Type': 'application/json',
		'X-API-Key': APIKEY
	}
};

//makes a request to the destiny manifest endpoint and 
//extracts it to the current directory as 'manifest.content'
//@manifest.zip: this is the compressed manifest downloaded from the destiny man endpoint
//@manifest.content: uncompressed manifest sqlite file which can be queried
exports.getManifest = () => {

	let outStream = fs.createWriteStream('manifest.zip');

	request(options)
	.on('response', function(res, body){
		console.log(res.statusCode);
	}).pipe(outStream)
	.on('finish', function(){
		let zip = new SZIP({
			file: './manifest.zip',
			storeEntries: true
		});

		zip.on('ready', function(){
			zip.extract('./manifest.content', function(err,count){
				if(err) console.log(err);
			});
		});
	});

}

// query manifest.content file with sqlite3 
// returns promise with records if found
exports.queryManifest = (tableName, hashes) => {
  return new Promise( (resolve, reject) => {
	let db = new sqlite.Database('manifest.content');
    
    // list of hashes to be queried
    let values = hashes.reduce( (sum, hash) => {
        return sum + "," + hash;
    });

	let records = [];

	 db.serialize(() => {
	    	
		let query = `SELECT json FROM ${tableName} WHERE id + 4294967296 IN (${values}) OR id IN (${values})`;

		db.each(query, function(err, row){
			if(err) throw err;
			let parsed = JSON.parse(row.json);
            records = [ ...records, parsed];
        }, function(err, count){ 
            resolve(records);
        });

    })
  })
}
