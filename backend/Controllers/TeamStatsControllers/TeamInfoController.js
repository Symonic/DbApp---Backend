const {User, Players, Teams} = require('../../Models/models')

const TeamInfoController = async (req, res) => {

    try {
        const team_info = await User.findAll({
            include: {
              model: Players,
              attributes: ['id'],
              include: {
                model: Teams,
                attributes: ['name','coach_id'],
                // where: {
                //   coach_id: Sequelize.col('user.id')
                // }
              }
            },
            where: {
              username: 'JC'
            }
          })
          .then(async user => {

            const coach_id = user[0].player.team.dataValues.coach_id

            try {
                const coach_info = await User.findOne({
                    attributes: ['first_name', 'last_name'],
                    where: {
                        id: coach_id
                    }
                })

                if(coach_info.lenght!=0){
                    return res.json({team_info:user, coach:coach_info})
                }

            } catch (error) {
                return res.json({'detail': error})
            }

          })

        // if(team_info.length != 0){

        //     //const coach_id = team_info.teams.coach_id
        //     //console.log(team_info.users)

        //     return res.json({team_info:team_info})
        // }

        
    } catch (error) {
        return res.json({'detail':error})
    }

}




module.exports = TeamInfoController