
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')
//cb.config('http://207.249.127.149',1026,'v2')

exports.queryInArea = async function (req,res) {
    let query = ngsi.createQuery(req.body);
    console.log(query);
    await cb.getWithQuery(query)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) =>{
        res.status(500).send(error);
    })
} 
