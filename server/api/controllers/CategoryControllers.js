const database = require('../models')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()


class CategoryControllers {

    static async add(req, res){
        const newCategory = req.body;
        try{
            await database.Category.create(newCategory)
            return res.status(200).json({ message: 'Category added successfully'})
        } catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async takeCategory(req, res){
        try{
            const pegarCategoria = await database.Category.findAll()
            return res.status(200).json(pegarCategoria)
        }catch (error){
            return res.status(500).json(error)
        }
    }

    static async atualizaCategoria(req, res){
        const { id } = req.params;
        let category = req.body;
        try {
            await database.Category.update(category, { where: { id: Number(id) }})
            await database.Category.findOne( { where: {id: Number(id) }})
            return res.status(200).json({message: "Category updated successfully"})

        }catch (error){
            return res.status(500).json(error.message)
        }
    }

}

module.exports = CategoryControllers