const {User, Players, Player_stats,} = require('../../Models/models')

const { Op } = require('sequelize');

const GetPlayerStatistics = async (req,res) => {

    try {

        const { playerId } = req.query
        if (!playerId) {
            return res.status(400).json({ message: 'Brak id zawodnika' });
        }
        console.log("id zawodnika", playerId);
        const user_stats_view = await User.findOne({
            attributes: ['id'],
            where: {id: playerId},
            include:[{
                model: Players,
                attributes:['id'],
                include: [{
                    model: Player_stats,
                    attributes:['goals','assists','yellow_cards','red_cards', 'attended_trainings', 'attended_matches']
                }]                
            }],

        });
        console.log("Fetched user stats view:", user_stats_view.player.player_stats[0]);
        if (user_stats_view) {
            return res.json({ user_stats_view });
        } else {
            return res.json({ detail: "No stats found for the given player ID" });
        }
    } catch (error) {
        return res.json({'detail':error.message})
    }
};






module.exports = GetPlayerStatistics