
const { Equipment, User, Teams } = require("../../Models/models")



const EquipmentAddController = async(req,res) => {
    try {
        const {descr} = req.body;
        console.log('nazwa i rozmiar', descr)

        const teamId = await User.findOne({
            attributes: ['id'],
            where:{
                username: req.user.name
            },
            include:[{
                model: Teams,
                attributes:['id'],
                
            }]
        })

        console.log('id teamu w eq: ',teamId.team.id)
        
        const add_equip_team = await Equipment.create({
            
            descr: descr,
            team_id: teamId.team.id,
            available: 'true'
            
        }
        )
        return res.status(201).json({"message":'created'})

    } catch (error) {
        console.error("Error adding equpiments", error);
        return res.json({ detail: error });
    }
}

module.exports = EquipmentAddController