var Zone = require('../models/zones');

var cb = require('ocb-sender')
//cb.config('http://207.249.127.149',1026,'v2')

exports.devicesZone = async function (req,res) {
	await Zone.findOne({ '_id': req.params.zone }, async function(err, zone) {
		if (err)
	      res.send(err);
	  	if (zone != null){
	  		await cb.queryEntitiesOnArea(zone.location ,".*","Device",true)
				.then((result) =>{
				    if (result.length > 0){
						res.status(200).json(result)
				    }else{
				    	res.status(200).json({})
				    }
			})
	  	}  	
	});
} 