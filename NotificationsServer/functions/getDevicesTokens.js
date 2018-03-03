var deviceTokens = require('../../API/models/deviceNotification')

module.exports = async function getDevicesTokens(devicesList) {
	console.log("tokens de devices")
	var TokensList = []
	await deviceTokens.find({}, async (err, deviceNot) => {
		//await devicesList.map( async (dev) => { //Recorre lista devices 
			await deviceNot.map((devNot) => { // recorre lista de tokens 
				//if (dev === devNot.refDevice){  // si son iguales los 
					console.log("Device encontrado"+devNot.refDevice)
					TokensList.push(devNot.fcmToken)
				//}
			})
		//})
	})
	return TokensList
}