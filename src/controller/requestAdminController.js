const RequestAdminModel = require("../models/requestToAdminModel");
const productModel = require("../models/AddProductModel")
const validator=require("../validation/validations")

const requestAdmin = async (req,res)=>{
    try {
       let data = req.body
        let { ProductId,Description,ApprovealStatus} = data
        if (!validator.isValid1(ProductId)) {
            return res.status(400).send({ status: false, message: "ProductId is required" })
        }
        if (!validator.isValidObjectId(ProductId)) {
            return res.status(400).send({ status: false, message: "ProductId not valid" })
        }
        if (!validator.isValid1(Description)) {
            return res.status(400).send({ status: false, message: "Description is required" })
        }
        let productData = await productModel.findOne({ _id: ProductId })
    if (!productData) { return res.status(404).send({ satus: false, message: "product is not found" }) }
    
    let saveData = await RequestAdminModel.create(data)
    res.status(201).send({status:true,data:saveData})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = {requestAdmin}