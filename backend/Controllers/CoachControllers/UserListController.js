const {User,Players,Teams, Player_positions, Positions} = require('../../Models/models')

const UserListController = async (req, res) => {
    try {
        
        const coach = await User.findOne({ where: { username: req.user.name, role: 'Coach' } });
        //console.log('Zalogowany trener:', coach);

        if (!coach) {
            //console.log('Coach not found');
            return res.status(404).json({ detail: "Coach not found" });
        }

        
        const teams = await Teams.findAll({ where: { coach_id: coach.id } });
        //console.log('Drużyny prowadzone przez trenera:', teams);

        if (teams.length === 0) {
            console.log('No teams found for this coach');
            return res.status(404).json({ detail: "No teams found for this coach" });
        }

        
        
        const list = await User.findAll({
            attributes:['first_name', 'last_name'],
            include: [{
                model: Players,
                attributes: ['id'],
                include:[{
                    model: Player_positions,
                    attributes:['position_id'],
                    include:[{
                            model:Positions,
                            attributes: ['position_code']
                        }]
                    }],
                where: { team_id: teams[0].id },
            }],
            where: { role: 'Player' }
        });
        //console.log('Zawodnicy w drużynach:', list);

        if (list.length === 0) {
            console.log('No players found for the teams of this coach');
            return res.status(404).json({ detail: "No players found for the teams of this coach" });
        }

        if(list.length != 0){
            
            return res.json({
                list:list
            })
        }
        else{
            throw new Error("no events")
        }

    } catch (error) {
        return res.json({detail: error})
    }
}


module.exports = UserListController