const { User, Teams } = require("../../Models/models")


const NotificationEditController = async (req, res) => {
    try {

        const {team_message, team_message_title} = req.body;
        console.log("powiadomienie", team_message_title);

        const team_id = await User.findOne({
            attributes: ['id'],
            where:{
                username: req.user.name
            },
            include:[{
                model: Teams,
                attributes:['id'],
                
            }]
        })
        console.log('eee',team_id.team.id)

        const update_team_notification = await Teams.update(
            {
                team_message_title,
                team_message
            },
            {
                where: {id: team_id.team.id },
                returning: true,
                plain: true
            }
        );

        
        return res.json({update_team_notification})




    } catch (error) {
        console.error("Error updating notification:", error);
        return res.json({ detail: error });
    }
}


module.exports = NotificationEditController