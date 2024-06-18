

const { User, Players, Player_stats } = require('../../Models/models');  // Upewnij się, że importujesz Player_stats

const UserUpdatePlayerStatistics = async (req, res) => {
    try {
        const { playerId } = req.query;
        const { goals, assists, red_cards, yellow_cards } = req.body;

        console.log("Updating stats for player ID:", playerId);
        
        
        const updatedStats = await Player_stats.update(
            {
                goals,
                assists,
                red_cards,
                yellow_cards
            },
            {
                where: { player_id: playerId },
                returning: true,
                plain: true
            }
        );

        return res.json({ updatedStats });
    } catch (error) {
        console.error("Error updating player statistics:", error);
        return res.json({ detail: error });
    }
};

module.exports = UserUpdatePlayerStatistics 