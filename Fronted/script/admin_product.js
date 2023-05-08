let main=document.getElementById("all_product")
let token=JSON.parse(localStorage.getItem("token"))
let name=JSON.parse(localStorage.getItem("name"))



fetchdata()
async function fetchdata(){
    try {
      let res=await fetch("http://localhost:8080/product/get",{
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
        let res= await  fetch(`http://localhost:8080/cart/get`,{
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
         let bdiv=document.createElement("div")
         bdiv.setAttribute("class","bdiv")
         let button =document.createElement("button")
         button.innerText="DELETE"
         let update =document.createElement("button")
         update.innerText="UPDATE"
         button.addEventListener("click",async()=>{
                count.innerText=++c
                try {
                    let res=await fetch(`http://localhost:8080/cart/addcart`,{
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

                } catch (error) {
                    console.log(error)
                }
         })
         bdiv.append(button,update)
        div.append(img,title,cat,price,des,bdiv)
        main.append(div)



    });
}

