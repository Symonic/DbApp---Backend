const crypto = require('crypto')
const {Create_user_token} = require('../../Models/models')
const {Op} = require('sequelize')

const checkNewPlayerTokenController = async (req, res) => {

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

    const TodayDateString = `${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:${date.second}`

    try {
        console.log(now)
        const query = await Create_user_token.findOne({
            where: {
                token: req.body.token,
                expire_date: {
                    [Op.lt]: now
                }
            }
        })
        // obsluga dalsza
        .then(token => {
            res.json({'token':'Found'})
        })
        .catch((err) => {
            return res.json({'detail': err})
        })

    } catch (error) {
        return res.status(400).json({'detail':error})
    }
}



module.exports = checkNewPlayerTokenController