const {User, Players, Player_stats,} = require('../../Models/models')

const UserIdViewDataController = async(req,res) => {


    try {
        const { playerId } = req.query
        if (!playerId) {
            return res.status(400).json({ message: 'Brak id zawodnika' });
        }
        console.log("id zawodnika_data", playerId);

        const user_info_id = await User.findOne({
            attributes: ['id','email', 'phone_number'],
            include: [{
                model: Players,
                attributes: ['date_of_birth', 'height', 'weight', 'boot_size']
            }],
            where: {
                id: playerId
            }
        })
        console.log(user_info_id)
        if (user_info_id) {
            return res.json({ user_info_id });
        } else {
            return res.json({ detail: "No data found for the given player ID" });
        }

    } catch (error) {
        return res.json({'detail':error.message})
    }
    
}


module.exports = UserIdViewDataController