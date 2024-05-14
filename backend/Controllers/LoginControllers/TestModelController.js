const {User, Refresh_token} = require('../../Models/models')

const TestModelController = async (req, res) => {
    try {
        const user = await Refresh_token.findAll({
            attributes: ['tokens']
        })
        if(user){
            res.json({user: user})
        }
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = TestModelController