var PointOnCampus = require('../../NotificationsServer/functions/pointOnCampus');

exports.pointCampus= function (req,res) {
    console.log(body);
    let point = body.point.split(";");
    let polygon = body.polygon.split(";");
    let salida = PointOnCampus(point, polygon);
    res.json({ isOnCampus: salida});
}