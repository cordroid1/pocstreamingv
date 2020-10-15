const cv = require('opencv4nodejs');
const getUserMedia = require('get-user-media-promise');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const FPS = 5;
const vCap = new cv.VideoCapture(0);
cv.AUDIO

vCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
vCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

setInterval(()=>{
     const frame = vCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image);
},1000/FPS);

server.listen(3000);