const {Equipment, Rented_equipments} = require('../../Models/models')

const ReturnEqController = async (req, res) => {
    try {
        
        const [affectedCount] = await Equipment.update(

            { available: 'true'},
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if(affectedCount > 0){

            try {

                const destroy = await Rented_equipments.destroy({
                    where: {
                        equipment_id: req.params.id
                    }
                })

                
                return res.status(200).json({"message": "successfully deleted"})
                

            } catch (error) {
                return res.status(400).json({'detail':error})
            }
        }
        else{
            return res.status(400).json({'detail':'error while updating Equipment model'})
        }

    } catch (error) {
        return res.json({detail: error})
    }
}


module.exports = ReturnEqController