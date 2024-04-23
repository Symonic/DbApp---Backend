const {client} = require('../Database/ConnectDB') 

const ResetPasswordController = async (req, res) => {
    const reset_query = await client.query(`UPDATE users set password='${req.body.password}' where resetpasswordtoken='${req.params.token}'`, (err, info) => {
        if(err){
            console.log(error)
            return res.json({"message": "password change failed"})
        }
        return res.json({"message":"password changed"})
    })
}


module.exports = ResetPasswordController