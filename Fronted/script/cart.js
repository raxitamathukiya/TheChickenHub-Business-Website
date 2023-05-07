let login=document.getElementById("login")
let signout=document.getElementById("signout")
let token=JSON.parse(localStorage.getItem("token"))
let name=(localStorage.getItem("name"))
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


fetchdata()
async function fetchdata(){
    try {
        let res= await  fetch(`http://localhost:8080/cart/get`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            },
    
          })
          let data= await res.json()
          console.log(data)
          c=data.length
          display(data)
    } catch (error) {
        console.log(error)
    }
}

function display(data){
    if(data.length==0){
        console.log(data.length)
        main.innerHTML=`<div class="empty"><h1>YOUR CART IS EMPTY.<br>LET'S START AN ORDER!</h1>
        <button class="startorder">Start Order</button>
        </div>`
    }else{
        count.innerText=c
        main.innerHTML=""
        data.forEach(element => {
            let div=document.createElement("div")
            div.setAttribute("class","cart1")
            let imgdiv=document.createElement("div")
            imgdiv.setAttribute("class","imgdiv")
            let infodiv=document.createElement("div")
            infodiv.setAttribute("class","infodiv")
            let img=document.createElement("img")
            img.setAttribute("src",element.image)
            let title=document.createElement("h4")
            title.innerText=element.title
            let des=document.createElement("p")
            des.innerText=element.discription
            let price=document.createElement("h4")
            price.innerText="Price: ₹ "+element.price
            let btn=document.createElement("button")
            btn.innerText="DELETE"
            btn.addEventListener("click",async()=>{
                    try {
                       let res=await fetch(`http://localhost:8080/cart/delete/${element._id}`,{
                        method:"DELETE",
                        headers:{
                            'Content-type':'application/json',
                            'Authorization':`Bearer ${token}`
                        },
                       }) 
                       let data= await res.json()
                       alert(data.message)
                       window.location="cart.html"
                    } catch (error) {
                        console.log(error)
                    }
            })
           
            imgdiv.append(img)
            infodiv.append(title,price,des,btn)
            div.append(imgdiv,infodiv)
            main.append(div)
        });
        for(let i=0;i<data.length;i++){
            total+=data[i].price
        }
        console.log(total)
        let checkout=document.createElement("button")
        checkout.setAttribute("class","checkout")
        checkout.textContent=`Total Price : ₹  ${total}`
        main.append(checkout)
    }
   
}