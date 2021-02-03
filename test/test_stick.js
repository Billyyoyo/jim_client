'use strict';

const net = require('net');

const client = net.createConnection({port: 8080, host: '127.0.0.1'}, function () {
    const body = Buffer.from('username=123&password=1234567');

    // 写入包头
    const headBuf = new Buffer.alloc(2);
    headBuf.writeUInt16BE(body.byteLength, 0);

    // 发送包头
    client.write(headBuf);
    // 发送包内容
    client.write(body);

    console.log('send: ' + body.toString() + ' (len:' + headBuf.readUInt16BE() + ')');

});

client.on('data', function (data) {
    const head = Buffer.alloc(2)
    data.copy(head, 0, 0, 2)
    const len = head.readUInt16BE()
    const body = Buffer.alloc(len)
    data.copy(body, 0, 2, 2 + len)
    console.log('receive: ' + body.toString() + ' (len:' + head.readUInt16BE() + ')')
});
client.on('end', function () {
    console.log('disconnect from server');
});