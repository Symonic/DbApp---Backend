const nodemailer = require('nodemailer')
const {client} = require('../../Database/ConnectDB')
const crypto = require('crypto')

const {User} = require('../../Models/models')

const RemindPasswordController = async (req, res) => {
    try {
        const query = await User.findAll({
            where: {
                email: `${req.body.email.toLowerCase()}`
            }
        })
        console.log("EEEEELLLLLOOOOO")
        console.log(query)
        // const query = awaitclient.query(`SELECT * from users where email='${req.body.email}'`)
        if(query.length != 0){
            const resetPasswordToken = crypto.randomBytes(32).toString('hex')

            const now = new Date()
                const date = {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate(),
                    hour: now.getHours(),
                    minute: now.getMinutes(),
                    second: now.getSeconds()
                }
            
                const tokenExpireDate = new Date(date.year, date.month, date.day,
                date.hour, date.minute+5, date.second)
                
                const tEDF = { // tEDF = tokenExpireDateFields
                    year: tokenExpireDate.getFullYear(),
                    month: tokenExpireDate.getMonth()+1,
                    day: tokenExpireDate.getDate(),
                    hour: tokenExpireDate.getHours(),
                    minute: tokenExpireDate.getMinutes(),
                    second: tokenExpireDate.getSeconds()
                }

                const tokenExpireDateString  = `${tEDF.year}-${tEDF.month}-${tEDF.day} ${tEDF.hour}:${tEDF.minute}:${tEDF.second}`
        

            try {
                const token_query = await User.update(
                    {
                        resetpasswordtoken: `${resetPasswordToken}`,
                        resetpasswordtokenexpirdate: `${tokenExpireDateString}`
                    },
                    {
                        where: {
                            email: `${req.body.email.toLowerCase()}`
                        }
                    }
                )

                //const reset_token_query = await client.query(`UPDATE users SET resetpasswordtoken='${resetPasswordToken}' where email='${req.body.email}'`)
                //const tokenExpireDateQuery = await client.query(`UPDATE users SET resetpasswordtokenexpiredate='${tokenExpireDateString}' where email='${req.body.email}'`)
                


                // MAIL SENDING
                try {
    
                    var transporter = nodemailer.createTransport({
                        host: "sandbox.smtp.mailtrap.io",
                        port: 2525,
                        auth: {
                          user: "91d02f4cac63ef",
                          pass: "b6adfb3c5583e3"
                        }
                      });

                    const message = {
                        from: 'dbappservicel09@gmail.com',
                        to: `dbappservicel09@gmail.com`,
                        subject: 'test',
                        text: "Plaintext version of the message",
                        html: `<p>Reset password <a href='http://localhost:3000/reset_password/${resetPasswordToken}'>link</a></p>`
                    }

                    await transporter.sendMail(message, (err, info) => {
                        if(err) console.log(err)
                        else{
                            console.log(info.response)
                        }
                    })
                
                } catch (error) {
                    res.json({"detail":error})
                }

                

                res.json({resetPasswordToken:resetPasswordToken})

            } catch (error) {
                res.json({"detail":error})
            }
        }
        else{
            res.json({'message': 'Jesli istnieje konto z tym emailem, zostal nie niego wyslany link resetujacy haslo.'})
        }
    } catch (error) {
        res.json({"detail":error})
    }
}


module.exports = RemindPasswordController