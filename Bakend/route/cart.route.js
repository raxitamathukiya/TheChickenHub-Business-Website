const express=require("express")
const cartRoute=express.Router()
const {cartModel}=require("../model/cart.model")
const {connection}=require("../db")

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: All the API routes realeted the Cart
 */

/**
 * @swagger
 * /cart/addcart:
 *  post:
 *      summary: This will add product in to the cart
 *      tags: [Cart]
 *      responses:
 *          200:
 *              description: added to the cart!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /cart/getcart:
 *  get:
 *      summary: This will get all cart product
 *      tags: [Cart]
 *      responses:
 *          200:
 *              description: give  All cart product!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /cart/delete/:id:
 *  delete:
 *      summary: This will deleted cart product
 *      tags: [Cart]
 *      responses:
 *          200:
 *              description: product deleted!! 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /cart/get:
 *  get:
 *      summary: This will get  all cart based on particuler login user
 *      tags: [Cart]
 *      responses:
 *          200:
 *              description: get cart product !! 
 *          400:
 *              description: Inccorect Request!!!!
 */



cartRoute.post("/addcart",async(req,res)=>{
    try {
        let postdata=req.body
        let data=new cartModel(postdata)
        await data.save()
        res.status(200).send({message:"This product added in to the cart"})
    } catch (error) {
        console.log(error)
    }
})

cartRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params 
    let data=await cartModel.findByIdAndDelete({_id:id})
    res.status(200).send({message:'product deleted'})
    } catch (error) {
        console.log(error)
    }
})
cartRoute.get("/get",async(req,res)=>{
    try {
        let data=await cartModel.find({userID:req.body.userID})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        
    }
})
cartRoute.get("/getcart",async(req,res)=>{
    try {
        let data= await cartModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        
    }
})


module.exports={
    cartRoute
}