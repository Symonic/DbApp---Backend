const jwt = require('jsonwebtoken')
const {client} = require('../Database/ConnectDB')

const RefreshTokenController = async (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    
    try {

        const query = await client.query(`SELECT * FROM REFRESH_TOKENS where token='${refreshToken}'`)
        if(query.rowCount > 0){
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403)
                const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
                res.json({accessToken: accessToken})
            })
            
        }
        else{
            res.sendStatus(403)
        } 

    } catch (error) {
        
    }
}


module.exports = RefreshTokenController