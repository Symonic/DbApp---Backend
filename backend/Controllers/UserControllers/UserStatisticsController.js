const {User, Players, Player_stats} = require('../../Models/models')

const UserStatisticsController = async (req, res) => {

    try {
        
        const User_stats = await User.findOne({
            attributes: ['id'],
            include:[{
                model: Players,
                attributes:['id'],
                include: [{
                    model: Player_stats,
                    attributes:['goals','assists','yellow_cards','red_cards', 'attended_trainings', 'attended_matches']
                }]
                
            }],
            where: {
                username: req.user.name
            }

        })
    
        if(User_stats.length != 0){
            return res.json({user_stats: User_stats})
        }

    } catch (error) {
        return res.json({'detail':error})
    }
}



module.exports = UserStatisticsController