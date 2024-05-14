const {Blacklist_refresh_token} = require('../../Models/models')

const RevokeTokenController = async (req, res) => {

    const token = req.body.token

    try {      
        const query = await Blacklist_refresh_token.create({
            token: `${token}`
        })
        res.json({'message':'success'})
    } catch (error) {
        res.json({'detail': error})
    }
}



module.exports = RevokeTokenController