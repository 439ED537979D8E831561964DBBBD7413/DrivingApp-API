const { DateTime } = require('luxon');
var Campus = require('../models/campus');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

exports.devicesCampus = async function (req,res) {
	await Campus.findOne({ '_id': req.params.campus }, async function(err, campus) {
		if (err)
	      res.send(err);
	  	if (campus != null){
			var dt = DateTime.local();
			let fifteenAgo = dt.minus({ minutes: 15 });
			let data  = {
				id: "Device_Smartphone_.*",
				type : "Device",
				options : "keyValues",
				georel :"coveredBy",
				geometry:"polygon",
				coords : campus.location,
				dateModified: `>=${fifteenAgo}`
			}
			let query = ngsi.createQuery(data);
			console.log(query);
			await cb.getWithQuery(query)
			.then((result) => {
				if (result.length > 0){
					res.status(200).json(result)
				}else{
					res.status(200).json({})
				}
			})
			.catch((error) =>{
				res.status(500).send(error);
			})
	  	}  	
	});
} 
