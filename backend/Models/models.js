const {Sequelize, Model, DataTypes} = require('sequelize');
const {sequelize} = require('../Database/ConnectDB');
const { noTrueLogging } = require('sequelize/lib/utils/deprecations');

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('Player', 'Coach', 'Admin'),
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetpasswordtoken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetpasswordtokenexpirdate: {
            type: DataTypes.TIME,
            allowNull: true
        },
        emailverifytoken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emailverifytokenexpirdate: {
            type: DataTypes.TIME,
            allowNull: true
        },
        
        
    },
    {
        sequelize,
        modelName: 'users'
    }
)

class Refresh_token extends Model {}
Refresh_token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        tokens: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: 'refresh_tokens'
    }
)

class Blacklist_refresh_token extends Model {}
Blacklist_refresh_token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'blacklist_refresh_tokens'
    }
)


class Event_players extends Model {}
Event_players.init(
    {
        event_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        player_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        state:{
            type: DataTypes.ENUM('Obecny','Nieobecny','Będzie','Niebędzie', 'Niezdeklarowany'),
            allowNull: false
        }

    },
    {
        sequelize,
        modelName: 'event_players'
    }  
)
class Events extends Model {}
Events.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        teams_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        type:{
            type: DataTypes.ENUM('Trening','Mecz domowy','Mecz wyjazdowy'),
            allowNull: true
        },
        descr:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        event_datetime:{
            type:DataTypes.TIME,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: 'events'
    }  
)
class Player_answers extends Model{}
Player_answers.init(
    {
        questionnare_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        player_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        mental_condition:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        physical_condition:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        motivation: {
            type:DataTypes.INTEGER,
            allowNull: true
        },
        injuries: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName:'player_answers'
    }
)
class Players extends Model {}
Players.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        date_of_birth:{
            type: DataTypes.DATE,
            allowNull:true
        },
        height:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        weight:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        boot_size:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        notes:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        team_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {
        sequelize,
        modelName:'players'
    }

)



class Positions extends Model {}
Positions.init(
    {
        position_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        position_code:{
            type: DataTypes.ENUM('BR','LO','ŚO','PO','CLS','CPS','LP','ŚP','PP','ŚPD','ŚPO','LS','PS','ŚN','N'),
            allowNull:true,
            primaryKey:true
        },
        full_name:{
            type: DataTypes.STRING(50),
            allowNull:false ,
        },
    },
    {
        sequelize,
        modelName:'positions'
    }

)

class Player_positions extends Model{}
Player_positions.init(
    {
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            // references: {
            //     model: Players,
            //     key: 'id'
            // }
        },
        position_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            // references: {
            //     model: Positions,
            //     key: 'position_id' 
            // }
        },
        pos_strength: {
            type: DataTypes.ENUM('Preferowana', 'Grywalna'), 
            allowNull: false
        }
        },
    {
        sequelize,
         modelName: 'player_positions',   
    }
) 

class Player_stats extends Model {}
Player_stats.init(
    {
        player_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        season_id:{
            type: DataTypes.DATE,
            allowNull:false,
            primaryKey:true
        },
        goals:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        assists:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        yellow_cards:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        red_cards:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        attended_matches:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        unattended_matches:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        attended_trainings:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        },
        unattended_trainings:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0
        }

    },
    {
        sequelize,
        modelName:'player_stats'
    }

)
class Questionnares extends Model {}
Questionnares.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true
        },
        team_id:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
    },
    {
        sequelize,
        modelName:'questionnares'
    }

)


class Rented_equipments extends Model {}
Rented_equipments.init(
    {
        player_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        equipment_id:{
            type: DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        rent_date:{
            type:DataTypes.DATE,
            allowNull:true
        }
    },
    {
        sequelize,
        modelName:'rented_equipments'
    }
)
class Equipment extends Model {}
Equipment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descr:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        available:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        team_id:{
            type: DataTypes.INTEGER,
            allowNull: false,

        }
    },
    {
        sequelize,
        modelName: 'equipments'
    }
)


class Seasons extends Model {}
Seasons.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        season_start:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        season_end:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName:'seasons'
    }

)
class Teams extends Model {}
Teams.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        coach_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        team_message_title:{
            type:DataTypes.STRING,
            allowNull:true
        },
        team_message:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },
    {
        sequelize,
        modelName:'teams'
    }

)
class Team_stats extends Model {}
Team_stats.init(
    {
        team_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        season_id:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        matches_won:{
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        matches_lost:{
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        matches_drawn:{
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        top_scorer:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        least_cards:{
            type: DataTypes.STRING,
            allowNull:true,
        },
    },
    {
        sequelize,
        modelName:'team_stats'
    }

)

class Create_user_token extends Model{}
Create_user_token.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        expire_date:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'create_user_token',
        tableName: 'create_user_token'
    }
)

// RELATIONS

User.hasOne(Players, {
    foreignKey: 'id'
})
Players.belongsTo(User, {
    foreignKey: 'id'
})

User.hasOne(Teams, { 
    foreignKey: 'coach_id'
 });
Teams.belongsTo(User, { 
    foreignKey: 'coach_id', as: 'coach'
 });

Teams.hasMany(Players, {
    foreignKey: 'team_id'
})
Players.belongsTo(Teams, {
    foreignKey: 'team_id'
})

Team_stats.hasMany(Players, {
    foreignKey: 'id'
})
Players.belongsTo(Team_stats, {
    foreignKey: 'team_id'
})

Teams.hasMany(Team_stats, {
    foreignKey: 'team_id'
})
Team_stats.belongsTo(Teams, {
    foreignKey: 'team_id'
})
Players.hasMany(Player_stats,{
    foreignKey: 'player_id'
})
Player_stats.belongsTo(Players, {
    foreignKey: 'player_id'
})
Teams.hasMany(Events,{
    foreignKey: 'teams_id'
})
Events.belongsTo(Teams, {
    foreignKey:'teams_id'
})
Events.hasMany(Event_players, {
    foreignKey: 'event_id'
})
Event_players.belongsTo(Events,{
    foreignKey: 'event_id'
})
Players.belongsToMany(Positions, { 
    through: Player_positions,
    foreignKey: 'player_id'
});

Positions.belongsToMany(Players, { 
    through: Player_positions, 
    foreignKey: 'position_id' 
});

Players.hasMany(Player_positions, {
    foreignKey: 'player_id' 
});
Player_positions.belongsTo(Players, { 
    foreignKey: 'player_id' 
});

Positions.hasMany(Player_positions, { 
    foreignKey: 'position_id' 
});
Player_positions.belongsTo(Positions, { 
    foreignKey: 'position_id' 
});


Teams.hasOne(Questionnares, {
    foreignKey: 'team_id'
})
Questionnares.belongsTo(Teams, {
    foreignKey: 'team_id'
})

Questionnares.hasMany(Player_answers, {
    foreignKey: 'questionnare_id'
})
Player_answers.belongsTo( Questionnares, {
    foreignKey: 'questionnare_id'
})
Players.hasOne(Player_answers, {
    foreignKey: 'player_id'
})
Player_answers.belongsTo(Players, {
    foreignKey: 'player_id'
})

Players.hasMany(Rented_equipments, {
    foreignKey: 'player_id'
})

Rented_equipments.belongsTo(Players, {
    foreignKey: 'player_id'
})



Teams.hasMany(Equipment, {
    foreignKey: 'team_id'
})
Equipment.belongsTo(Teams, {
    foreignKey: 'team_id'
})

// // // In Positions model
// Players.hasMany(Event_players, {
//     foreignKey: 'player_id'
// })
// Event_players.belongsTo(Players, {
//     foreignKey: 'player_id'
// })








module.exports = {User, Refresh_token, Event_players,Events,Player_answers,Players, Positions, Player_positions, Player_stats,Questionnares, Rented_equipments, Equipment, Seasons, Teams,Team_stats, Blacklist_refresh_token, Create_user_token}


