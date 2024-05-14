const {User, Players, Team_stats} = require('../../Models/models')

const TeamStatisticsController = async (req, res) => {
    
    try {
        const team_stats = await User.findOne({
            attributes: ['id'],
            include: [
                {
                    model: Players,
                    attributes: ['id'],
                    include: [{
                        model: Team_stats,
                        attributes: ['matches_won', 'matches_lost', 'matches_drawn', 'top_scorer', 'least_cards']
                    }]
                }
            ],
            where: {
                username: req.user.name
            }
        })

        if(team_stats.length != 0){
            return res.json({stats:team_stats})
        }

        
    } catch (error) {
        return res.json({'detail':error})
    }
    
}




module.exports = TeamStatisticsController