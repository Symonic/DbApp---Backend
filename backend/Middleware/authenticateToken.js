const jwt = require('jsonwebtoken')
const {Blacklist_refresh_token} = require('../Models/models')
require('dotenv').config()

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    const query = await Blacklist_refresh_token.findAll({
        where: {
            token: `${token}`
        }
    })

    if(query.length != 0){
       return res.sendStatus(403)
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        console.log(err)
        if(err) return res.sendStatus(403)

        req.user = user
        next()
    })

}

module.exports = authenticateToken
