const { DateTime } = require('luxon');
var Campus = require('../models/campus');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')
var fetch = require('node-fetch')
//cb.config('http://207.249.127.149',1026,'v2')

exports.alertsCampus = async function (req,res) {
	await Campus.findOne({ '_id': req.params.campus }, async function(err, campus) {
		if (err)
	      res.send(err);
	  	if (campus != null){
			var dt = DateTime.local();
			let fifteenAgo = dt.minus({ minutes: 15 });

			let data  = {
				id: "Alert:Device_Smartphone_.*",
				type : "Alert",
				options : "count",
				georel :"coveredBy",
				geometry:"polygon",
				coords : campus.location,
				//limit : "10",
				//dateObserved: `>=${fifteenAgo}`
			}

			let query2 = ngsi.createQuery(data2);

			await cb.getWithQuery(query)
			.then((response) => {

				let data2  = {
					id: "Alert:Device_Smartphone_.*",
					type : "Alert",
					options : "keyValues",
					georel :"coveredBy",
					geometry:"polygon",
					coords : campus.location,
					limit : "10",
					offset : response.headers["fiware-total-count"] - 10
					//dateObserved: `>=${fifteenAgo}`
				}

				let query2 = ngsi.createQuery(data2);
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

			})
				l
	  	}  	
	});
} 





