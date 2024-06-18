const { Team_stats,User,Players } = require("../../Models/models");


const TeamStatisticEditController = async (req, res) => {

    try {
        const { matches_won, matches_lost, matches_drawn, top_scorer, least_cards } = req.body;

        const user = await User.findOne({
            attributes: ['id'],
            include: [
                {
                    model: Players,
                    attributes: ['id', 'team_id'],
                    include: [{
                        model: Team_stats,
                        attributes: ['matches_won', 'matches_lost', 'matches_drawn', 'top_scorer', 'least_cards']
                    }]
                }
            ],
            where: {
                username: req.user.name
            }
        });

        console.log('id teamu: ',user.player.team_id)

        const update_team_stats = await Team_stats.update(
            {
            matches_won,
            matches_drawn,
            matches_lost,
            top_scorer,
            least_cards
        },
        {
            where:{team_id: user.player.team_id},
            returning: true,
            plain:true
        }
    );
    return res.json({ update_team_stats });

        // if (user && user.Players[0] && user.Players[0].Team_stats) {
        //     const teamStat = user.Players[0].Team_stats;

        //     // Aktualizuj statystyki drużyny
        //     teamStat.matches_won = matches_won;
        //     teamStat.matches_lost = matches_lost;
        //     teamStat.matches_drawn = matches_drawn;
        //     teamStat.top_scorer = top_scorer;
        //     teamStat.least_cards = least_cards;

        //     // Zapisz zmiany w bazie danych
        //     await teamStat.save();

        //     return res.json({ message: 'Statistics updated successfully' });
        // } else {
        //     // Jeśli statystyki nie istnieją, możesz je utworzyć
        //     const newTeamStat = await Team_stats.create({
        //         matches_won,
        //         matches_lost,
        //         matches_drawn,
        //         top_scorer,
        //         least_cards,
        //         PlayerId: user.Players[0].id // Dodaj powiązanie z graczem
        //     });
        // }
        // return res.json({ message: 'Statistics created successfully', data: newTeamStat });
        
    } catch (error) {
        
    }
}

module.exports = TeamStatisticEditController