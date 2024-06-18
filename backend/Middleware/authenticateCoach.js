const {Sequelize} = require('sequelize')
const {User} = require('../Models/models')

const authenticateCoach = async (req, res, next) => {

    try {
        
        const searched_user = await User.findOne({
            attributes: ['id', 'role'],
            where: {
                username: req.user.name
            }
        })

        if(searched_user){
               
            const role = searched_user.dataValues.role
            if(role=='Coach'){
                req.is_user=true
                next()
            }else{
                req.is_user=false
                res.status(403).json({'detail':'User is not a coach. Access Forbidden'})
            }
            
            

        }else{
            res.status(404).json({'detail': 'User not found'})
        }

    } catch (error) {
        res.status(400).json({'detail':error})
    }
}



module.exports = authenticateCoach