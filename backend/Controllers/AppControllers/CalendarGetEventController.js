
const {User, Players, Rented_equipments, Equipment, Events} = require('../../Models/models')
const { Op } = require('sequelize');

const CalendarGetEventController = async (req,res) => {

    try{
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Brak daty w zapytaniu' });
        }

        console.log('data', date)

        if (!req.user) {
            return res.status(403).json({ message: 'Brak dostępu do danych użytkownika' });
        }

        const player = await Players.findOne({
            attributes:['team_id'],
            include:[{
                model:User,
                attributes:[],
                where:{
                    username: req.user.name
                }
            }]
        });
        if (!player) {
            return res.status(404).json({ message: 'Nie znaleziono powiązanego gracza' });
        }

        const parsedDate = new Date(date);
        // Formatowanie daty na początek i koniec dnia
        const startDate = new Date(parsedDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(parsedDate);
        endDate.setHours(23, 59, 59, 999);

        // Pobieranie wydarzeń z bazy danych na podstawie daty
        const events = await Events.findAll({
            where: {
                event_datetime: {
                    [Op.between]: [startDate, endDate]
                },
                teams_id: player.team_id
            }
        });

        // if (events.length === 0) {
        //     return res.status(404).json({ message: 'Brak wydarzeń dla podanej daty' });
        // }

        if(events.length !=0){
            res.json({events:events})
        }
        else{
            res.status(400).json({'detail': 'Brak wydarzeń dla podanej daty'})
        }
        //console.log(events[0].event_datetime)
        

        //res.status(200).json(events);
    }catch(error){
        return res.json({detail: error.message})
    }
}

module.exports = CalendarGetEventController