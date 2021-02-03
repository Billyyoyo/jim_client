'use strict';

const net = require('net');
const Stick = require('stickpackage').stick;

const tcp_server = net.createServer(function (socket) {
    socket.stick = new Stick(65530).setReadIntBE('16');
    socket.on('data', function (data) {
        socket.stick.putData(data);
    });

    socket.stick.onData(function (data) {
        // 解析包头长度
        const head = new Buffer.alloc(2);
        data.copy(head, 0, 0, 2);
        const len = head.readUInt16BE()
        // 解析数据包内容
        const body = new Buffer(len);
        data.copy(body, 0, 2, len + 2);

        console.log('receive: ' + body.toString() + ' (len:' + head.readUInt16BE() + ')');

        const rbody = Buffer.from('welcome user!')
        const rhead = Buffer.alloc(2)
        rhead.writeUInt16BE(rbody.byteLength, 0)
        const resp = Buffer.alloc(2 + rbody.byteLength)
        rhead.copy(resp, 0, 0, 2)
        rbody.copy(resp, 2, 0, rhead.readUInt16BE())
        socket.write(resp)
        console.log('reply: ' + rbody.toString() + ' (len:' + rhead.readUInt16BE() + ')');
    });

    socket.on('close', () => {
        console.log('client disconnected');
    });

    socket.on('error', error => {
        console.log(`error:客户端异常断开: ${error}`);
    });
});

tcp_server.on('error', function (err) {
    throw err;
});
tcp_server.listen(8080, function () {
    console.log('tcp_server listening on 8080');
});