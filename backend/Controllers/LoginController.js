const {client} = require('../Database/ConnectDB')
const jwt = require('jsonwebtoken')

const Login = async (req,res) => {

    try {
        const query = await client.query(`SELECT * from users where username='${req.body.username}'
                                                                and password='${req.body.password}'`)
        if(query.rowCount>0){
            
            const user = {name:req.body.username}
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

            try {
                
                await client.query(`INSERT INTO refresh_tokens(token) VALUES('${refreshToken}')`)
                res.json({"access":accessToken, "refresh":refreshToken})

            } catch (error) {
                res.json({"detail":error})
            }

            

        }else{
            throw new Error("no user with that credentials found")
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).send({"detail":`${error}`})
    }
}


module.exports = Login