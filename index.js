'use strict';

//This server receives POST REQUESTS
//var http = require('http');
const googleTrends = require('./customGoogleTrends');

const PORT = process.env.PORT || 3000;

const SocketServer = require('ws').Server;

var express = require('express');
var app             = express();
var server          = app.listen(PORT);

const wss = new SocketServer({ server });

app.use(function (request, response) {

  //Create Head for JSON response
  //response.writeHead(200,{"Content-Type":"application/json"});

  //Reply to post request with my custom execute method
  if(request.method == "POST")
  {
    googleTrends.execute(request, response);
  }
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  //Inside here messages can be received (check https://www.npmjs.com/package/ws#sending-and-receiving-text-data for more)
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    //Works but gets taken over by the counter which runs every second
    ws.send(message);
  });
  ws.on('close', () => console.log('Client disconnected'));
});
