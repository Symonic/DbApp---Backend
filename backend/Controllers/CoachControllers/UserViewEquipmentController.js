

// const { Rented_equipments, Equipment,User } = require("../../Models/models");


// const UserViewEquipmentController = async(req,res) => {

//     try {
        
//         const { playerId } = req.query
//         if (!playerId) {
//             return res.status(400).json({ message: 'Brak id zawodnika' });
//         }
//         console.log("id zawodnika eq", playerId);

//         console.log("rented endpoint ---------------------------------------------------------")
        

//         const user = await User.findOne({
//             attributes: ['id'],
//             where: {id: playerId}
//         })

//         if(!user){
//             res.status(404).json({'detail': 'No user found'})
//         }

//         const rented_equipment = await Rented_equipments.findAll({
//               where: {player_id: user.dataValues.id}
//         }).then(async rent_equips => {

//             console.log(rent_equips)
//             if(rent_equips.length != 0){
//                 const equip_id_list = []

//                 for (let i = 0; i < rent_equips.length; i++) {
//                     equip_id_list.push(rent_equips[i].equipment_id)
//                 }

//                 const equipment = await Equipment.findAll({
//                     where:{
//                         id: {
//                             [Sequelize.Op.in]: equip_id_list
//                         }
//                     }
//                 })

//                 if(equipment.length !=0){
//                     res.json({eq:equipment})
//                 }
//                 else{
//                     res.status(400).json({'detail': 'Equipment find error'})
//                 }

//             }
//             else{
//                 return res.status(200).json({'detail':'No rented equipment'})
//             }
            


//         })
//     } catch (error) {
//         return res.json({'detail':error.message})
//     }
// }

// module.exports = UserViewEquipmentController