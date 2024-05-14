const {User, Players} = require('../../Models/models')

const UserInfoController = async (req, res) => {

    try {
        
        const User_cred = await User.findOne({
            attributes: ['email', 'phone_number'],
            include: [{
                model: Players,
                attributes: ['date_of_birth', 'height', 'weight', 'boot_size']
            }],
            where: {
                username: req.user.name
            }
        })

        if(User_cred.length!=0){
            return res.json({user_cred:User_cred})
        }

    } catch (error) {
        return res.json({'detail':error})
    }
}



module.exports = UserInfoController