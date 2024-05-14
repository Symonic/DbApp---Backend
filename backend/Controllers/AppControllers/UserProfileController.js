const {User, Players, Teams} = require('../../Models/models')

const UserProfileController = async (req, res) => {
    
    try {
        const User_cred = await User.findOne({
            attributes: ['first_name', 'last_name', 'role'],
            include: [
                {
                    model: Players,
                    attributes: ['id'],
                    include: [{
                        model: Teams,
                        attributes: ['name', 'team_message_title', 'team_message']
                    }]
                }
            ],
            where: {
                username: req.user.name
            }
        })

        if(User_cred.length != 0){
            return res.json({user_cred:User_cred})
        }

        
    } catch (error) {
        return res.json({'detail':error})
    }
    
}


module.exports = UserProfileController