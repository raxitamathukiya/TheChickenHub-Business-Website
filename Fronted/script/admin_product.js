let main=document.getElementById("all_product")
let token=JSON.parse(localStorage.getItem("token"))
let name=JSON.parse(localStorage.getItem("name"))
let updatebtn=document.getElementById("update")
let productbtn=document.getElementById("productbtn")
let form=document.querySelector("form")
let id=document.getElementById("id")
let title=document.getElementById("title")
let image=document.getElementById("image")
let price=document.getElementById("price")
let category=document.getElementById("category")
let discription=document.getElementById("discription")

productbtn.addEventListener("click",()=>{
    window.location="admin_product.html"
})
let orderbtn=document.getElementById("orderbtn")
orderbtn.addEventListener("click",()=>{
    window.location="admin_order.html"
})
let userbtn=document.getElementById("userbtn")
userbtn.addEventListener("click",()=>{
    window.location="admin_user.html"
})

let addproduct =document.getElementById("addproduct")
addproduct.addEventListener("click",()=>{
    window.location="admin_add_product.html"
})

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
         let update =document.createElement("a")
         update.setAttribute("data-id",element._id)
         update.setAttribute("class","card-link")
         update.innerText="UPDATE"
        
         button.addEventListener("click",async()=>{
                
                try {
                    let res=await fetch(`http://localhost:8080/product/delete/${element._id}`,{
                        method:"DELETE",
                        headers:{
                            'Content-type':'application/json',
                            'Authorization':`Bearer ${token}`
                        },
                        
                    })
                    let data=await res.json()
                    alert(data.message)
                    window.location="admin_product.html"

                } catch (error) {
                    console.log(error)
                }
         })

         update.addEventListener("click",()=>{
         
            let editLinks = document.querySelectorAll(".card-link");
            for (let editLink of editLinks) {
              editLink.addEventListener("click", (e) => {
                e.preventDefault();
                let currentId = e.target.dataset.id;
               console.log(currentId)
               populateEditForms(currentId)
              });
            }
          modal.style.display = "block";
         })
         bdiv.append(button,update)
        div.append(img,title,cat,price,des,bdiv)
        main.append(div)



    });
}
 function populateEditForms(currentId) {
    fetch(`http://localhost:8080/product/${currentId}`,{
        method:"GET",
        headers:{
        "Content-Type":"application/json",
        'Authorization':`Bearer ${token}`
         },
    })
      .then((res)=>{
        return res.json()
      })
      .then((data) => {
        console.log(data)
                id.value = data[0]._id;
                title.value = data[0].title;
                category.value = data[0].category;
                image.value = data[0].image;
                price.value = data[0].price;
                discription.value = data[0].discription;
       
      });
//    console.log("hello")
//     try {
//         let res=fetch(`https://localhost:8080/product/${currentId}`,{
//             method:"GET",
//             headers:{
//               "Content-Type":"application/json",
//               'Authorization':`Bearer ${token}`
//             },
//         })
//         let data= res.json()
//         console.log(data)
//           id.value = data.id;
//           title.value = data.title;
//           category.value = data.category;
//           image.value = data.image;
//          price.value = data.price;
//          discription.value = data.discription;
//     } catch (error) {
//         console.log(error)
//     }


  }
  updatebtn.addEventListener("click",async(e)=>{

    e.preventDefault()

    try {
        let obj={
          _id: id.value ,
          title:title.value,
          image: image.value,
          category: category.value,
          price:price.value,
          discription:discription.value ,
        }
        console.log(obj)
       let res=await  fetch(`http://localhost:8080/product/update/${obj._id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            'Authorization':`Bearer ${token}`
          },
          body:JSON.stringify(obj)
        })
        let data=await res.json()
        alert(data.message)
        fetchdata()
      
  } catch (error) {
    console.log(error)
  }
  setTimeout(() => {
    modal.style.display="none"
  },);
 
  })
// -----------------------model----------------------//
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
