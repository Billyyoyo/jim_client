function encodec(str) {
    const body = Buffer.from(str)
    const data = Buffer.alloc(2 + body.byteLength)
    const len = body.byteLength
    data.writeUInt16BE(len, 0)
    body.copy(data, 2, 0, body.byteLength)
    return data
}

function decodec(str) {
    const buf = Buffer.from(str)
    const len = buf.readUInt16BE()
    const body = Buffer.alloc(len)
    buf.copy(body, 0, 2, 2 + len)
    return body.toString()
}

module.exports = {
    encodec: encodec,
    decodec: decodec,
}