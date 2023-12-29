const database = require('../models')
let ejs = require('ejs')
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');

class BillControllers {    

    static async generateReport(req, res){
        const generatedUuid = uuid.v1();
        const orderDetails = req.body;
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        orderDetails.uuid = generatedUuid;
        try{
            const report = await database.Bill.create(orderDetails)
            //console.log("dirName", __dirname)
            if(!report){
                ejs.renderFile(path.join(__dirname,'',"report.ejs"),{productDetails:productDetailsReport,name: orderDetails.name,email:orderDetails.email,contactNumber:orderDetails.contactNumber,paymentMethod:orderDetails.paymentMethod,totalAmount:orderDetails.totalAmount},(err, results)=>{
                    if(err){
                        console.log("err", err)
                        console.log("dirName", __dirname)
                        return res.status(500).json(err);
                        
                    }else{
                        pdf.create(results).toFile('./generated_pdf/' + generatedUuid + ".pdf", function (err, data){
                            if(err){
                                console.log("err", err);
                                return res.status(500).json(err);
                            }else {
                                return res.status(200).json({ uuid: generatedUuid })
                            }
                        })
                    }
                })
            }
            return res.status(200).json({ message: 'Product added successfully'})
        } catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async getPdf(req, res){
        const orderDetails = req.body;
        const pdfPath = './generated_pdf/' + orderDetails.uuid + ".pdf";
        if(fs.existsSync(pdfPath)){
            res.contentType("application/pdf");
            fs.createReadStream(pdfPath).pipe(res);
        }else {
            var productDetailsReport = JSON.parse(orderDetails.productDetails)

            ejs.renderFile(path.join(__dirname,'',"report.ejs"),{productDetails:productDetailsReport,name: orderDetails.name,email:orderDetails.email,contactNumber:orderDetails.contactNumber,paymentMethod:orderDetails.paymentMethod,totalAmount:orderDetails.totalAmount},(err, results)=>{
                if(err){
                    console.log("err", err)
                    console.log("dirName", __dirname)
                    return res.status(500).json(err);
                    
                }else{
                    pdf.create(results).toFile('./generated_pdf/' + orderDetails.uuid + ".pdf", function (err, data){
                        if(err){
                            console.log("err", err);
                            return res.status(500).json(err);
                        }else {
                            res.contentType("application/pdf");
                            fs.createReadStream(pdfPath).pipe(res);
                        }
                    })
                }
            })
        }
    }

    static async getBills (req, res, next){
        try{
            const getBill = await database.Bill.findAll({
                order: ["id"]
            })
            return res.status(200).json(getBill)
        }
        catch(error){
            return res.status(500).json(error.message)
        }
        
    }

    static async deleteBill(req, res){
        const { id } = req.params;
        const delet = req.body;
        
        try{
            await database.Bill.destroy({ where: { id: Number(id) }})
            return res.status(200).json({ mensagem: `Bill deleted Successfully`})
        }catch(erro){
            return res.status(500).json(error.message)
        }
    }

    

}

module.exports = BillControllers