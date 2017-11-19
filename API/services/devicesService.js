var Campus = require('../models/campus');

var cb = require('ocb-sender')

exports.devicesCampus = async function (req,res) {
	await Campus.findOne({ '_id': req.params.campus }, async function(err, campus) {
		if (err)
	      res.send(err);
	  	if (campus != null){
	  		await cb.queryEntitiesOnArea(campus.location ,".*","Device",true)
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
