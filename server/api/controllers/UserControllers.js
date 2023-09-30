const database = require('../models')

class UserControllers {

    static async signUp(req, res) {
        let user = req.body;
        console.log('user', user)
        console.log('email', user.email)

        let successMessage = 'Usuário cadastrado com sucesso!!';
        let unSuccessMessage = 'Problemas no cadastro!!';
        let emailMessage = 'Usuário já cadastrado!';

        try {
            const verificaEmail = await database.User.findOne({
                where: { email: user.email }
                }
            )

            if(verificaEmail == null){
                try {
                    const newUser = await database.User.create(user)
                    return res.status(200).json({ message: successMessage})
                }catch (error){
                    return res.status(500).json({ message: unSuccessMessage})
                }                
            }
            //console.log('verificaEmail', verificaEmail)
            return res.status(200).json({ message: emailMessage})
        } catch (error){
            return res.status(500).json(error.message)            

        }
        
        
       
    }


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