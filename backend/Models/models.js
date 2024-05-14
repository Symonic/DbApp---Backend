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
            type: DataTypes.STRING,
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
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        }
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
        question_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        player_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        string_answer:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        numeric_answer:{
            type:DataTypes.INTEGER,
            allowNull:true
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
        heigth:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        weigth:{
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
        player_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        position:{
            type: DataTypes.ENUM('BR','LO','ŚO','PO','CLS','CPS','LP','ŚP','PP','ŚPD','ŚPO','LS','PS','ŚN','N'),
            allowNull:true,
            primaryKey:true
        },
        pos_strength:{
            type:DataTypes.ENUM('Preferowana', 'Grywalna'),
            allowNull:true
        },
    },
    {
        sequelize,
        modelName:'positions'
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
        title:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },
    {
        sequelize,
        modelName:'questionnares'
    }

)
class Questions extends Model {}
Questions.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true
        },
        question:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        questionnare_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
    },
    {
        sequelize,
        modelName:'questions'
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
        equipment:{
            type: DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        rent_date:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName:'rented_equipments'
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

// RELATIONS

User.hasOne(Players, {
    foreignKey: 'id'
})
Players.belongsTo(User, {
    foreignKey: 'id'
})

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

module.exports = {User, Refresh_token, Event_players,Events,Player_answers,Players, Positions, Player_stats,Questionnares,Questions, Rented_equipments,Seasons, Teams,Team_stats, Blacklist_refresh_token}

