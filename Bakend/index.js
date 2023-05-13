const express=require("express")
const {connection}=require("./db")
const {userRoute}=require("./route/user.route")
const {productRoute}=require("./route/product.route")
const {auth}=require("./middlewear/auth.middleware")
const {cartRoute}=require("./route/cart.route")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const {admincartRoute}=require("./route/admin_cart.route")
const cors=require("cors")

require ('dotenv').config()
const app=express()
const options = {
   definition: {
     openapi: '3.0.0',
     info: {
       title: 'CFF API Documentation',
       version: '1.0.0',
     },
   },
   apis: ['./route/*.js'],
 };
 
 const openapiSpecification = swaggerJsdoc(options);
 app.use("/cffapi",swaggerUi.serve,swaggerUi.setup(openapiSpecification))
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)
app.use("/product",productRoute)
app.use(auth)
app.use("/cart",cartRoute)
app.listen(process.env.port,async()=>{
   try {
    await connection
    console.log("coneect to the db")
   } catch (error) {
    console.log(error)
   }
   console.log("server is running")
})

