const database = require('../models')

class UserControllers {
    static async pegaUser(req, res){        
        try{            
            const getUser = await database.User.findAll()
            return res.status(200).json(getUser)
        }
        catch (error){
            return res.status(500).json({message: 'Usuário não autenticado!'})
        }
    }

}

module.exports = UserControllers