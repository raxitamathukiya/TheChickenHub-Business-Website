let login=document.getElementById("login")
let signout=document.getElementById("signout")
let token=JSON.parse(localStorage.getItem("token"))
let name=JSON.parse(localStorage.getItem("name"))
let main=document.getElementById("allcart")
let count=document.getElementById("count")
let c=0
let total=0
if(token==null){
    login.innerText="Sign In"  
  }
 else{
  login.innerText=name
  signout.innerText="SignOut"
  signout.addEventListener("click",()=>{
      localStorage.setItem("token",null)
      login.innerText="Sign In"
  })
 }
 let Total = document.getElementById("cartTotal");
 let discountTotal = document.getElementById("discountTotal")
 let discount = document.getElementById("discount")

 let discountApply = document.getElementById("discountApply")


 const D = new Date();

 document.getElementById("date").innerHTML = D
 fetchdata()
async function fetchdata(){
    try {
        let res= await  fetch(`https://cff-jqw1.onrender.com/cart/get`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            },
    
          })
          let data= await res.json()
          console.log(data)
          c=data.length
          count.innerText=c
          display(data)
          displayprice(data)
    } catch (error) {
        console.log(error)
    }
}
let Tbody = document.getElementById("elements")
function display(data){
    let Serial=1
    data.forEach(element => {
        let row = document.createElement("tr")

        let Sr = document.createElement("td")
        let Name = document.createElement("td")
        let Category = document.createElement("td")
        let Quantity = document.createElement("td")
        let Price = document.createElement("td")

        Sr.innerText = Serial
        Name.innerText = element.title
        Category.innerText = element.category
        Quantity.innerText = 1
        Price.innerText = Number(element.price) * Number(1)

        row.append(Sr, Name, Category, Quantity, Price)
        Tbody.append(row)
        Serial++
    });

}
function displayprice(data){
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum = sum + (data[i].price *1)
    }
    Total.innerText = sum + " Rs."
    if (sum > 1000) {
        discountTotal.innerText = (Math.floor(sum * 0.90)) + " Rs."
        Total.innerText = sum + " Rs."
        discountApply.innerText = "10 % discount has been applied"

    }
}
let start_order=document.getElementById('start_order')
start_order.addEventListener("click",async()=>{
    window.location="./product.html"
})