
require('dotenv').config();

let mqtt = require('./mqtt')('open');
const parseUrl = require('./parse');
const path = process.env.MQTT_USER+"/tunnel/";

mqtt.subscribe(path+'url');

mqtt.on('message', function(topic, payload) {
	let url = payload.toString();
	// url = url.split('//');
	// console.log(url[0]);
	console.log("The http server is:  "+url);
	// let str = parseUrl(url[0]);
	// console.log("the ssh command we should paste into the command line to get into the PI server");
	// console.log("\n\t"+str+"\n");
})

mqtt.on('connect', function() {
	console.log("opening tunnel");
	mqtt.publish(path+'connect');
})

setTimeout(function() {
	process.exit();
}, 10000);