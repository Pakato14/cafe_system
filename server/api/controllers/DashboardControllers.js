const database = require('../models')
let ejs = require('ejs')
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');

class DashboardControllers {    

    static async details(req, res){

        try{
            const categoryCount = await database.Category.count( { col: 'id' } );
            const productCount = await database.Product.count( { col: 'id' } );
            const billCount = await database.Bill.count( { col: 'id' } );

            var data = {
                category: categoryCount,
                product: productCount,
                bill: billCount
            }

            return res.status(200).json(data)
        }
        catch(error){
                return res.status(500).json(error.message);
        }
        

       

        
    }
    

    

}

module.exports = DashboardControllers