const {Equipment, Rented_equipments, User} = require('../../Models/models')

const RentEqController = async (req, res) => {
    try {
        
        console.log('rent eq endpoint ----------------------------------------------------------------')

        const [affectedCount] = await Equipment.update(

            { available: 'false'},
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if(affectedCount > 0){

            try {
                const user = await User.findOne({ where: { username: req.user.name } });

                if(!user) return res.status(404).json({"detail": 'user not found'})

                const Rented_eq = await Rented_equipments.create({
                    player_id: user.id,
                    equipment_id: req.params.id,
                    //rent_date: Date.now()
                })
                
                return res.status(201).json({"message":'created'})
            

            } catch (error) {
                return res.json({'detail':error})
            }

            return res.status(200).json({'message':'updated'})
        }
        else{
            return res.status(400).json({'detail':'error while updating Equipment model'})
        }

    } catch (error) {
        return res.json({detail: error})
    }
}


module.exports = RentEqController