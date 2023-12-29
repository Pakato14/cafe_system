const database = require('../models')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()


class ProductControllers {

    static async addProduct(req, res){
        const newProduct = req.body;
        try{
            await database.Product.create(newProduct)
            return res.status(200).json({ message: 'Product added successfully'})
        } catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async takeProduct(req, res){
        try{
            const pegarProduto = await database.Product.findAll()
            return res.status(200).json(pegarProduto)
        }catch (error){
            return res.status(500).json(error)
        }
    }

    static async takeByCategory(req, res){
        const { id } = req.params;
        try{
            const byCategory = await database.Product.findAll({
                order: ["id"],
                where: { category_id: Number(id)},
                include: [
                    {
                        association: "ass_product_category",
                        where: database.Product.category_id = database.Category.id,
                        attributes: ["name"]
                    }
                ]
            });
            return res.status(200).json(byCategory);
        }catch (error) {
            return res.status(500).json(error)
        }
    }

    static async takeById(req, res){
        const { id } = req.params;
        try{
            const byCategory = await database.Product.findOne({
                order: ["id"],
                where: { id: Number(id)},
                include: [
                    {
                        association: "ass_product_category",
                        where: database.Product.category_id = database.Category.id,
                        attributes: ["name"]
                    }
                ]
            });
            return res.status(200).json(byCategory);
        }catch (error) {
            return res.status(500).json(error)
        }
    }

    static async atualizaProduto(req, res){
        const { id } = req.params;
        let product = req.body;
        try {
            await database.Product.update(product, { where: { id: Number(id) }})
            await database.Product.findOne( { where: {id: Number(id) }})
            return res.status(200).json({message: "Product updated successfully"})

        }catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async deleteProduct(req, res){
        const { id } = req.params
        try {
            await database.Product.destroy( { where: { id: Number(id)}})
            return res.status(200).json({message: "Product Deleted Successfully"});
        }catch (error){
            return res.status(500).json(error.message)
        }
    }

}

module.exports = ProductControllers