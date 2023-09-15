let main=document.getElementById("all_product")
let login=document.getElementById("login")
let signout=document.getElementById("signout")
 let token=JSON.parse(localStorage.getItem("token"))
let name=JSON.parse(localStorage.getItem("name"))
let peri =document.getElementById("peri")
let box =document.getElementById("box")
let rolls =document.getElementById("rolls")
let buckets =document.getElementById("buckets")
let biryani =document.getElementById("biryani")
let burgers =document.getElementById("burgers")
let snaks =document.getElementById("snaks")
let beverages =document.getElementById("beverages")
let cartimg=document.getElementById("cartimg")
let count=document.getElementById("count")
let c=0
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
      let res=await fetch("https://cff-jqw1.onrender.com/product/get",{
        method:"GET",
        headers:{
            'Content-type':'application/json'
        },

      })
      let data=await res.json()
      console.log(data)
      display(data)

    } catch (error) {
        console.log(error)
    }
}
fetchcartdata()
async function fetchcartdata(){
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
          count.innerText=data.length
          display(data)
    } catch (error) {
        console.log(error)
    }
}

function display(data){
    main.innerHTML=""
    data.forEach(element => {
        let div=document.createElement("div")
        let h2=document.createElement("h2")
        div.setAttribute("class","card")
        let img=document.createElement('img')
        img.setAttribute("src",element.image)
        let title=document.createElement("h4")
        title.innerText=element.title
        let des=document.createElement("p")
        des.innerText=element.discription
        let price=document.createElement("h4")
        price.innerText="Price: ₹ "+element.price
        let cat=document.createElement("p")
         cat.innerText="🔺"+ ' Non veg'
         let button =document.createElement("button")
         button.innerText="Add To Cart"
         button.addEventListener("click",async()=>{
                count.innerText=++c
                try {
                    let res=await fetch(`https://cff-jqw1.onrender.com/cart/addcart`,{
                        method:"POST",
                        headers:{
                            'Content-type':'application/json',
                            'Authorization':`Bearer ${token}`
                        },
                        body:JSON.stringify({title:element.title,
                            image:element.image,
                            price:element.price,
                            category:element.category,
                            discription:element.discription,})
                    })
                    let data=await res.json()
                    alert(data.message)
                    fetchcartdata()

                } catch (error) {
                    console.log(error)
                }
         })
        div.append(img,title,cat,price,des,button)
        main.append(div)



    });
}

peri.addEventListener("click",async()=>{
   let cat="PERI PERI MATCH SPECIALS"
    try {
        let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=PERI PERI MATCH SPECIALS`,{
          method:"GET",
          headers:{
              'Content-type':'application/json',
              'Authorization':`Bearer ${token}`
          },
  
        })
        let data=await res.json()
        console.log(data)
        display(data)
  
      } catch (error) {
          console.log(error)
      }

})

box.addEventListener("click",async()=>{
     try {
         let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=BOX MEALS`,{
           method:"GET",
           headers:{
               'Content-type':'application/json',
               'Authorization':`Bearer ${token}`
           },
   
         })
         let data=await res.json()
         console.log(data)
         display(data)
   
       } catch (error) {
           console.log(error)
       }
 
 })
 rolls.addEventListener("click",async()=>{
    try {
        let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=CHICKEN ROLLS`,{
          method:"GET",
          headers:{
              'Content-type':'application/json',
              'Authorization':`Bearer ${token}`
          },
  
        })
        let data=await res.json()
        console.log(data)
        display(data)
  
      } catch (error) {
          console.log(error)
      }

})
buckets.addEventListener("click",async()=>{
    try {
        let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=CHICKEN BUCKETS`,{
          method:"GET",
          headers:{
              'Content-type':'application/json',
              'Authorization':`Bearer ${token}`
          },
  
        })
        let data=await res.json()
        console.log(data)
        display(data)
  
      } catch (error) {
          console.log(error)
      }

})
biryani.addEventListener("click",async()=>{
    try {
        let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=BIRYANI BUCKETS`,{
          method:"GET",
          headers:{
              'Content-type':'application/json',
              'Authorization':`Bearer ${token}`
          },
  
        })
        let data=await res.json()
        console.log(data)
        display(data)
  
      } catch (error) {
          console.log(error)
      }

})
snaks.addEventListener("click",async()=>{
    try {
        let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=SNACKS`,{
          method:"GET",
          headers:{
              'Content-type':'application/json',
              'Authorization':`Bearer ${token}`
          },
  
        })
        let data=await res.json()
        console.log(data)
        display(data)
  
      } catch (error) {
          console.log(error)
      }

})
burgers.addEventListener("click",async()=>{
    try {
        let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=BURGERS`,{
          method:"GET",
          headers:{
              'Content-type':'application/json',
              'Authorization':`Bearer ${token}`
          },
  
        })
        let data=await res.json()
        console.log(data)
        display(data)
  
      } catch (error) {
          console.log(error)
      }

})
beverages.addEventListener("click",async()=>{
     try {
         let res=await fetch(`https://cff-jqw1.onrender.com/product/category/?category=BEVERAGES`,{
           method:"GET",
           headers:{
               'Content-type':'application/json',
               'Authorization':`Bearer ${token}`
           },
   
         })
         let data=await res.json()
         console.log(data)
         display(data)
   
       } catch (error) {
           console.log(error)
       }
 
 })

 cartimg.addEventListener("click",()=>{
    window.location="cart.html"
 })
 let start_order=document.getElementById('start_order')
start_order.addEventListener("click",async()=>{
    window.location="./product.html"
})