const crypto = require('crypto')
const {Create_user_token, Teams, User} = require('../../Models/models')

const CreateNewPlayerTokenController = async (req,res) => {

    const createAccountToken = crypto.randomBytes(32).toString('hex')

    const now = new Date()
    const date = {
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
    }

    const tokenExpireDate = new Date(date.year, date.month, date.day + 3,  // 3 dni ważności
        date.hour, date.minute, date.second)

    const tEDF = { // tEDF = tokenExpireDateFields
        year: tokenExpireDate.getFullYear(),
        month: tokenExpireDate.getMonth() + 1,
        day: tokenExpireDate.getDate(),
        hour: tokenExpireDate.getHours(),
        minute: tokenExpireDate.getMinutes(),
        second: tokenExpireDate.getSeconds()
    }

    const tokenExpireDateString = `${tEDF.year}-${tEDF.month}-${tEDF.day} ${tEDF.hour}:${tEDF.minute}:${tEDF.second}`

    try {
        
        const user = await User.findOne({
            attributes: ['id'],
            where: {
                username: req.user.name
            }
        })

        if(!user){
            return res.status(404).json({'detail':' No user'})
        }else{
            const id = user.dataValues.id
            const team = await Teams.findOne({
                attributes: ['id'],
                where: {
                    coach_id: id
                }
            })

            if(!team){
                return res.status(404).json({'detail':' No team'})
            }else{
                console.log('cipcia')
                const team_id = team.dataValues.id
                const query = await Create_user_token.create({expire_date:tokenExpireDate, role:'Player', token:createAccountToken, team_id: team.dataValues.id})
                .then(token => {
                    res.json({'createPlayerToken':createAccountToken})
                })

            }

        }

        

    } catch (error) {
        res.status(400).json({'detail':error})
    }
}



module.exports = CreateNewPlayerTokenController