

const {User, Players, Teams, Player_positions, Positions, Player_answers} = require('../../Models/models')



const QuestionaryController = async (req, res) => {
    
    try {
        const userTeamId = await User.findOne({ 
            attributes:[],
            include: [{
                model:Players,
                attributes: ['id', 'team_id']
            }],
            where: {username: req.user.name},
        })
        console.log('zalogowany user:', userTeamId)
    
        if(!userTeamId){
            console.log('User Team Id not found');
            return res.status(404).json({detail: "User Team Id not found"});
        }
    
        const playersNames = await User.findAll({
            attributes:['first_name', 'last_name'],
            include: [{
                model:Players,
                attributes: ['id'],
                include: [{
                    model: Player_positions,
                    attributes: ['position_id'],
                    include: [{
                        model: Positions,
                        attributes: ['full_name']
                    }]
                }, {
                    model: Player_answers,
                    attributes: ['player_id', 'mental_condition', 'physical_condition', 'injuries', 'motivation']
                }],
                where: {
                    team_id: userTeamId.player.team_id
                }
            }]
        })
    
        console.log('Zawodnicy w druzynie', playersNames[0].player.player_positions[0].position.full_name)
    
        if(!playersNames){
            onsole.log('Players names not found');
            return res.status(404).json({detail: "Players names not found"});
        }
        else{
            return res.json({
                
                playersNames: playersNames
        
            })
        }
    
    } catch (error) {
        return res.json({detail: error})
    }
    
    
    
}


module.exports = QuestionaryController