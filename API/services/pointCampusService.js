var PointOnCampus = require('../../NotificationsServer/functions/pointOnCampus');

exports.pointCampus= function (req,res) {
    let body = req.body;

    let point = body.point.split(",");
    point[0] = Number(point[0])
    point[1] = Number(point[1])

    //console.log(point)
    let polygon = body.polygon.split(";");
    for(let i in polygon){
        tempPolygon = polygon[i].split(",")
        tempPolygon[0] = Number(tempPolygon[0]);
        tempPolygon[1] = Number(tempPolygon[1]);
        polygon[i] = tempPolygon;
    }

    //console.log(polygon)
    
    let salida = PointOnCampus(point, polygon);
    res.json({ isOnCampus: salida});
}