const {User} = require('../../Models/models')
const {Op} = require('sequelize')

const CheckIfUserExistsController = async (req, res) => {

    try {
        console.log(req.body.username)
        const user = await User.findOne({
            attributes: ['id'],
            where: {
                [Op.or]: [
                    {
                        username: {
                            [Op.eq]: req.body.username
                        },
                        email: {
                            [Op.eq]: req.body.email
                        }
                    }
                ]
        }})

        if(!user){
            return res.status(200).json({'message':true})
        }
        else{
            return res.status(200).json({'message':false})
        }

    } catch (error) {
        return res.status(400).json({'detail':error})
    }

} 



module.exports = CheckIfUserExistsController