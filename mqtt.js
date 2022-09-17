

const mqtt = require('mqtt');


module.exports = function(clientId) {

	const host = process.env.MQTT_HOST;

	let options = {
		port: 1883,
		protocol: 'mqtt',
		host,
		qos: 3
	}

	console.log("<< opening mqtt connection for '"+clientId+"'");

	let connection = mqtt.connect(options);

	// if (connection == true) {
	// 	console.log("<< connected to  '"+clientId+"'");
	// }
	return connection;

}