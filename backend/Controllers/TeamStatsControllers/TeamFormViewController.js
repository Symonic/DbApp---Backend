const {Op, DATE} = require('sequelize')

const {User,Players,Teams,Events, Event_players,sequelize} = require('../../Models/models');

const TeamFormViewController = async (req, res) => {
    const actual_date = new Date()
        const date = {
            year: actual_date.getFullYear(),
            month: actual_date.getMonth(),
            day: actual_date.getDate(),
            hour: actual_date.getHours(),
            minute: actual_date.getMinutes(),
    
        }
        const date_of_event = new Date(date.year, date.month, date.day+7,
            date.hour, date.minute)

    try {
        const user = await User.findOne({
            where: { username: req.user.name },
            include: {
                model: Players,
                attributes: ['id','team_id'],
                include: {
                    model: Teams,
                    attributes: ['id']
                }
            }
        });

        if (!user || !user.player || !user.player.team_id) {
            return res.status(404).json({ detail: 'User or team not found' });
        }

        const teamId = user.player.team_id;

        const playerCount = await Players.count({
            where: { team_id: teamId }
        });

        const events_form = await User.findAll({
            attributes: ['id'],
            include: [
                {
                    model: Players,
                    attributes: ['id'],
                    include: [{
                        model: Teams,
                        attributes:['id'],
                        include: [
                            {
                            model: Events,
                            attributes: ['id','title', 'type', 'event_datetime'],
                            where:{
                                [Op.or]: [{type: 'Mecz wyjazdowy'}, {type: 'Mecz domowy'}],
                                event_datetime:{
                                    [Op.between]: [actual_date,date_of_event],
                                } 
                            },
                            include: [{
                                model: Event_players,
                                attributes:['event_id'],

                            }],
                            order: [
                                ['event_datetime', 'ASC']
                            ]
                        
                        }]
                    
                    }]
                }    
            ],
            where:{
                 username: req.user.name,
            },
        });


        const event_playersId = events_form[0].player.team.events[0].id

        const event_will_attend_players = await Event_players.count({
            where: {event_id: event_playersId,
                state: "Będzie"
            }
        })

        if(events_form.length != 0){
            
            // console.log(events_form[0].player.team.events[0].id)
            //console.log(event_will_attend_players)
            //console.log(events_form)
            return res.json({
                playerCount: playerCount,
                event_will_attend_players: event_will_attend_players,
                events_form: events_form,
            })
        }
        else{
            throw new Error("no events")
        }
    } catch (error) {
        return res.json({ 'detail': error });
    }
};

module.exports = TeamFormViewController;
