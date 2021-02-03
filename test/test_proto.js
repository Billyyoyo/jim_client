let msgpb = require('./proto/msg_pb')

let word = new msgpb.Words()
word.setText('hello word')

let bytes = word.serializeBinary()
console.log(bytes)

let word2 = msgpb.Words.deserializeBinary(bytes)
console.log(word2.getText())