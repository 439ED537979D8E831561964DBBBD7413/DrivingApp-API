var Campus = require('../models/campus');

var cb = require('ocb-sender')
//cb.config('http://207.249.127.149',1026,'v2')

exports.alertsCampus = async function (req,res) {
	await Campus.findOne({ '_id': req.params.campus }, async function(err, campus) {
		if (err)
	      res.send(err);
	  	if (campus != null){

			let data  = {
				id: "Alert:Device_Smartphone_.*",
				type : "Alert",
				limit: "100",
				options : "keyValues",
				georel :"coveredBy",
				geometry:"polygon",
				coords : campus.location,
				limit : "10"
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





