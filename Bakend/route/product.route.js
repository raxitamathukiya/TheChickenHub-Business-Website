const express=require("express")
const productRoute=express.Router()
const {productModel}=require("../model/product.model")
const {connection}=require("../db")

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

module.exports={
    productRoute
}

