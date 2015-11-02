'use strict';

let http = require('http');
let path = require('path');
let fs   = require('fs');

let server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  } else if (req.url === '/game.bundle.js') {
    res.writeHead(200, { 'Content-Type': 'script/javascript' });
    fs.createReadStream(path.join(__dirname, 'game.bundle.js')).pipe(res);
  } else if (req.url === '/nes.png') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    fs.createReadStream(path.join(__dirname, 'nes.png')).pipe(res);
  } else if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    fs.createReadStream(path.join(__dirname, 'favicon.ico')).pipe(res);
  } else {
    res.writeHead(404);
    res.write('Not Found');
    res.end();
  }
});

server.listen(process.env.PORT || 3000);
