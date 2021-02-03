let net = require('net')
const Codec = require('./codec')

let port = 4009
let host = 'localhost'
let client = new net.Socket()
client.setEncoding('binary')
client.connect(port, host, function () {
    startSend()
})
client.on('data', function (data) {
    const msg = Codec.decodec(data)
    console.log('from server:' + msg)
})
client.on('error', function (error) {
    console.log('error:' + error)
})
client.on('close', function () {
    console.log('Connection closed')
})

function startSend() {
    setInterval(() => {
        const data = Codec.encodec('hello server')
        client.write(data)
    }, 2000)
}
