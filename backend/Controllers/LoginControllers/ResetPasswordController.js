const {client} = require('../../Database/ConnectDB') 

const {User} = require('../../Models/models')

const ResetPasswordController = async (req, res) => {
    try {
        
        const check_date = await User.findOne({
            attributes: ['resetpasswordtokenexpirdate'],
            where: {
                resetpasswordtoken: `${req.params.token}`
            }
        }).catch(err => {
            res.json({'detail': error})
        })

        const expire_date = check_date.resetpasswordtokenexpirdate

        const date = Date.now()
        const current_date = new Date(date)
        
        if(expire_date < current_date){
            res.json({'detail': 'reset password token expired'})
        }
        else{

            try {
                
                const reset_password = await User.update(
                    {
                        password: `${req.body.password}`
                    },
                    {
                        where: {
                            resetpasswordtoken: `${req.params.token}`
                        }
                    }
                )

                res.json({'message': 'success'})

            } catch (error) {
                res.json({'detail': error})
            }

            res.json({'message': 'success'})
        }
        // const reset_query = await client.query(`UPDATE users set password='${req.body.password}' where resetpasswordtoken='${req.params.token}'`, (err, info) => {
        //     if(err){
        //         console.log(error)
        //         return res.json({"message": "password change failed"})
        //     }
        //     return res.json({"message":"password changed"})
        // })

    } catch (error) {
        
    }
}


module.exports = ResetPasswordController