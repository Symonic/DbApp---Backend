const jwt = require('jsonwebtoken')
const {Refresh_token} = require('../../Models/models')

const RefreshTokenController = async (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    
    try {

        const query = await Refresh_token.findAll({
            where: {
                tokens: `${req.body.token}`
            }
        })
        // const query = await client.query(`SELECT * FROM REFRESH_TOKENS where token='${refreshToken}'`)
        if(query){
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