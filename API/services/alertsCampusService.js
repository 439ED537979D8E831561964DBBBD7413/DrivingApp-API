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

			let query = ngsi.createQuery(data);

			const options = {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
			};
			
            await fetch(`http://130.206.113.226:1026/v2/entities${query}`, options)
			.then(async (response) => {

				let off = Number(response["headers"]["_headers"]["fiware-total-count"][0])  
				let data2  = {
					id: "Alert:Device_Smartphone_.*",
					type : "Alert",
					options : "keyValues",
					georel :"coveredBy",
					geometry:"polygon",
					coords : campus.location,
					limit : "10",
				}
				if (off > 20){
					data2.offset = offset -10
				}
				//console.log(off)
				let query2 = ngsi.createQuery(data2);
				console.log(query2);
				await cb.getWithQuery(query2)
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
			.catch((error) =>{
				res.status(500).send(error);
			})
				
	  	}  	
	});
} 





