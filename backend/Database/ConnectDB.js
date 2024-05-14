// const pg = require('pg')
// const {Client} = pg

// const client = new Client({
//     connectionString: process.env.POSTGRES_URL
// })

const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    define: {
        timestamps: false
    }
})

const ConnectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to the database ...')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {ConnectDB, sequelize}
