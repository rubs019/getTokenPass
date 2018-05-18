const dotenv = require('dotenv')
const unConnectedPass = require('./lib/unConnectedPass')
const connectedPass = require('./lib/connectedPass')

dotenv.load()

unConnectedPass()
    .then((res) => console.log(res.value))
    .catch((err) => {
        throw err
    })