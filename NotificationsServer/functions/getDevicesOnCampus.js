const { DateTime } = require('luxon');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

module.exports = async function getDevicesOnCampus(location) {
	console.log("devices en el campus")
	var dt = DateTime.local().setZone('America/New_York');
	let teenAgo = dt.minus({ minutes: 10 });
	let devicesList = []
	if (location !== undefined){
		let query = ngsi.createQuery({
		  	id: ".*",
		  	type: "Device",
		  	options: "keyValues",
		  	georel :"coveredBy",
			geometry:"polygon",
			coords : location,
			dateModified: `>=${teenAgo}`
		})
		console.log(query)
		await cb.getWithQuery(query)
		.then(async (result) => {
			
		    await result.map((device) =>{ 
		    	console.log(device.id)
		    	devicesList.push(device.id)
		    })
		})
		.catch((err) => console.log(err))
	}
	return devicesList
}

//georel : "coveredBy",
		  //geometry:"polygon",
		  //coords : location,