const database = require('../models')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()

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

    static async login(req, res){
        const user = req.body;
        console.log('user', user)
        try {
            const verificaUser = await database.User.findOne({
                where: { email: user.email }
            })

            if(!verificaUser){
                return res.status(401).json({message:"Incorrect Username or Password"})
            }
            else if(user.status === 'false'){
                return res.status(401).json({message: "Wait for Admin Approval"})
            }
            else if(user.password == verificaUser.password){
                const response = {email: verificaUser.email, role: verificaUser.role}
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h'})
                res.status(200).json({ token: accessToken});
            }
            else {
                return res.status(400).json({message: "Something went wrong. Please try again later"})
            }
        }
        catch(error){
            res.send({ message: 'Problemas ao realizar login!' })
        }
    }    

    static async forgot (req,res){
        const user = req.body;
        try{
            const procuraUser = await database.User.findOne({
                where: { email: user.email }
            })
            if(!error){
                if(procuraUser.length <= 0){
                    return res.status(200).json({message: "Password sent successfully to you email."})
                }
                else
                {
                    var mailOptions = {
                        from: process.env.EMAIL,
                        to: procuraUser.email,
                        subject: 'Password by Cafe Management System',
                        html: '<p><b>Your login details for Cafe Management System</b><br><b>Email: </b>'+procuraUser.email+'<br><b>Password: </b>'+procuraUser.password+'<br><a htef="http://localhost:4200/">Click here to login</a></p>'
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            console.log('Email sent: '+info.response)
                        }
                    });
                    return res.status(200).json({message: "Password sent successfully to you email."})
                }

            }
            else{
                return res.status(500).json(error)
            }

        }catch(error){
            res.send({ message: 'Problemas ao realizar login!' })
        }
    }

}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})





module.exports = UserControllers