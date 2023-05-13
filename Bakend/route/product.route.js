const express=require("express")
const productRoute=express.Router()
const {productModel}=require("../model/product.model")
const {connection}=require("../db")

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: All the API routes realeted the Products
 */

/**
 * @swagger
 * /product/add:
 *  post:
 *      summary: This will add new product in the DataBase
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: New productadded!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /product/get:
 *  get:
 *      summary: This will get all product to the database
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: get All product!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /product/category:
 *  get:
 *      summary: This will sort data by category
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: filter the data by category!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /product/delete/:id:
 *  delete:
 *      summary: This will delete the product
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: product deleted!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /product/update/:id:
 *  put:
 *      summary: This will update the product
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: product updated!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

productRoute.post("/add",async(req,res)=>{
    try {
        const data=req.body
        const add=new productModel(data)
        await add.save()
        res.status(200).send({message:"new product added"})
    } catch (error) {
        console.log(error)
    }
})

productRoute.get("/get",async(req,res)=>{
    try {
        let data=await productModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})

productRoute.get("/category",async(req,res)=>{
    try {
        let query=req.query
        let data=await productModel.find(query)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})
productRoute.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params
        let data=await productModel.find({_id:id})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})

productRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params 
        let data=await productModel.findByIdAndDelete({_id:id})
        res.status(200).send({message:'Product deleted'})
    } catch (error) {
        console.log(error)
    }
})
productRoute.put("/update/:id",async(req,res)=>{
    try {
        const {id}=req.params 
        const updata=req.body
        let data=await productModel.findByIdAndUpdate({_id:id},updata)
        res.status(200).send({message:'Product Update'})
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    productRoute
}

