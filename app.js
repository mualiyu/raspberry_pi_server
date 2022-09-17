
require('dotenv').config();
const ngrok = require('ngrok');


const server_ngrok = async () => {
	let http_opt = {
		proto: 'http',
		addr: 80,
		authtoken: process.env.NGROK_TOKEN
	}
	let options = {
		proto: 'tcp',
		addr: 22,
		authtoken: process.env.NGROK_TOKEN
	}

	try {
		// http
		console.log("Connecting to Ngrok Http...");
		let http_url = await ngrok.connect(http_opt);
		console.log("tcp_HTTP Url: "+http_url);
		// tcp 
		let url = await ngrok.connect(options);
		console.log("tcp_url: "+url);
		return http_url;
	} catch(err) {
		console.log("Ngrok main app.js error: "+err);
}
  
}

let server = server_ngrok();

// MQTT SECTION
let path = process.env.MQTT_USER+"/tunnel/";

let mqtt = require('./mqtt')('tunnel');

mqtt.subscribe(path+"connect");
mqtt.subscribe(path+"disconnect");

// const {connect, disconnect} = require('./ngrok');

mqtt.on('message', async function(topic) {

	console.log("got a message: "+topic);

	let subTopic = topic.split('/')[2];

	if (subTopic == "connect") {
		let urls = server;
		console.log("ngrok returned a url: "+urls);
		// mqtt.publish(path+"url", urls);
	}

	if (subTopic == "disconnect") {
		// await disconnect();
		console.log("disconnected");
		mqtt.publish(path+"disconnected");
	}

})