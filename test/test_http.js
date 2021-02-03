const axios = require('axios')

const cli = axios.create({
    baseURL: 'http://localhost:4001/jim/api/v1',
    timeout: 10000
})

cli.get('/enter?code=' + 1, {})
    .then(resp => {
        console.log(resp.data)
    })
    .catch(err => {
        console.log(err)
    })