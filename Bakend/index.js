const express=require("express")
const app=express()
const {connection}=require("./db")
const {productRoute}=require("./route/product.route")
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use("/product",productRoute)
app.listen(8080,()=>{
    console.log("server is running....")
})

