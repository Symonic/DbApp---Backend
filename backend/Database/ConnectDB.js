const pg = require('pg')
const {Client} = pg

const client = new Client({
    connectionString: process.env.POSTGRES_URL
})


const ConnectDB = async () => {
    try {
        client.connect()
        console.log('Connected to the database ...')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {ConnectDB, client}
