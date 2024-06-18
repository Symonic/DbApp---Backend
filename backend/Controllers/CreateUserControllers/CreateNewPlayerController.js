const {User, Create_user_token, Players} = require('../../Models/models')

const CreateNewPlayerController = async (req, res) => {
    try {
        
        const {
            name,
            surname,
            email,
            login,
            password,
            secondpassword,
            birthday,
            height,
            weight,
            bootnumber,
        } = req.body


        console.log(password)
    
    const token = await Create_user_token.findOne({
        attributes: ['team_id'],
        where: {
            token: req.params.token
        }
    })

    if(!token){
        return res.status(403).json({'detail': 'token not found'})
    }else{

        const team_id = token.dataValues.team_id

        const new_user = await User.create({
            username: login,
            password: password,
            first_name: name,
            last_name: surname,
            email: email,
            is_active: false,
            role: 'Player',
        })

        if(new_user){
            const new_player = await Players.create({
                id: new_user.dataValues.id,
                date_of_birth: birthday,
                height: height,
                weight: weight,
                boot_size: bootnumber,
                team_id: team_id, 
            })

            if(new_player){
                return res.status(201).json({'message':'successfully created'})
            }else{
                return res.status(400).json({'detail':'error creating user'})
            }
        }
        else{
            return res.status(400).json({'detail':'error creating user'})
        }
    }

    
    } catch (error) {
        return res.status(400).json({'detail':error.message})
    }
}



module.exports = CreateNewPlayerController