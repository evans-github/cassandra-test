

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', function(){
    console.console.log("I lost a client");
  });

  console.console.log("One more client connected");
  ws.send('something');
});
