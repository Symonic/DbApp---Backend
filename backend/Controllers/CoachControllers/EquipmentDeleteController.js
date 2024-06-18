const { Equipment } = require("../../Models/models");



const EquipmentDeleteController = async(req,res) =>{
    try {
        
        const equipId = req.params.id;

        console.log("usuniety sprzet id", equipId)


        const delete_eq = await Equipment.destroy({
            where:{
                id: equipId
            }
        })
        if (delete_eq) {
            return res.json({ message: 'deleted' });
        } else {
            return res.status(404).json({ detail: 'Equipment not found' });
        }



        
    } catch (error) {
        console.error("Error deleting equip:", error);
        return res.status(500).json({ detail: error });
    }

}

module.exports = EquipmentDeleteController