const {Equipment} = require('../../Models/models')

const AvailableEqController = async (req, res) => {
    try {
        
        const equipment = await Equipment.findAll()

        if(equipment.length!=0){
            res.json({eq:equipment})
        }
        else{
            res.status(404).send({"detail":`No equipment`})
        }

    } catch (error) {
        res.json({detail: error})
    }
}


module.exports = AvailableEqController