var OPEN = 1;
var CLOSED = 3;

var webSocket;

function onOpen(event) {
	Log("Connection to WebSocket server.");
}

function onClose(event) {
	Log("Disconnection.");
}

function onError(event) {
	Log("Error occured : " + event.data);
}

function onMessage(event) {
	var unpackMessage = unpack(event.data);
	Log("response msg : " + unpackMessage);
}

function connection() {
	if(webSocket != null && (webSocket.readyState == OPEN)) {
		alert("Please don't repeat the request connetion.");
		return;
	}

	var wsServer = document.getElementById("address");
	if(wsServer.value.length == 0) {
		alert("Please enter the service address!");
		wsServer.focus();
		return;
	}

	Log("Ready to connection.");
	try {
		webSocket = new WebSocket(wsServer.value);
		webSocket.onopen = onOpen;
		webSocket.onclose = onClose;
		webSocket.onerror = onError;
		webSocket.onmessage = onMessage;
	} catch (e) {
		Log(e.message);
		return;
	}
}

function closeConnection() {
	if(webSocket == null) {
		alert("Not connected to the server.");
		return;
	} else if(webSocket.readyState == CLOSED) {
		alert("The connection has been closed.");
		return;
	}

	Log("Ready to close connetion.");
	try {
		webSocket.close();
	} catch (e) {
		Log(e.message);
		return;
	}
	Log("Close connection is success.");
}

function sendmsg() {
	if(webSocket == null) {
		alert("Not connected to the server.");
		return;
	} else if(webSocket.readyState == CLOSED) {
		alert("The connection has been closed.");
		return;
	}

	var message = document.getElementById("msg");
	if(message.value.length == 0) {
		alert("Please enter the request message!");
		message.focus();
		return;
	}

	Log("request msg : " + message.value);

	var packMessage = pack(message.value);
	webSocket.send(packMessage);
}

function pack(msg) {
	//TODO pack message
	return msg;
}

function unpack(msg) {
	//TODO unpack message
	return msg;
}

function Log(msg) {
	var table = document.getElementById("infotable");
	var row = table.insertRow(0);
	var cell1 = row.insertCell();
	var cell2 = row.insertCell();

	var date = new Date();
	var dateStr = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " "
		+ date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds();

	cell1.innerHTML = dateStr;
	cell2.innerHTML = msg;
}