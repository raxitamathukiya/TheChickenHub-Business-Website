let tbody=document.getElementById("tbody")
let homebtn=document.getElementById("homebtn")
homebtn.addEventListener("click",()=>{
    window.location="admin.html"
})
let productbtn=document.getElementById("productbtn")
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
        let res=await fetch(`https://cff-jqw1.onrender.com/users/get`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
            }
        })
        let data=await res.json()
        console.log(data)
        display(data)
    } catch (error) {
        console.log(error)
    }
}


function display(data){
    data.forEach(element => {
        let tr=document.createElement("tr")
        let id=document.createElement("td")
        let name=document.createElement("td")
        let email=document.createElement("td")
        let del=document.createElement("td")
        del.setAttribute("class","del")
        let btn=document.createElement("button")
        btn.setAttribute("class","btn")
        btn.addEventListener("click",async()=>{
            try {
                let res=await fetch(`https://cff-jqw1.onrender.com/users/delete/${element._id}`,{
                 method:"DELETE",
                 headers:{
                     'Content-type':'application/json',
                    
                 },
                }) 
                let data= await res.json()
                console.log(data)
                alert(data.message)
                window.location="admin_user.html"
             } catch (error) {
                 console.log(error)
             }
        })
        id.innerText=element._id
        name.innerText=element.name
        email.innerText=element.email
        btn.innerText="DELETE"
        del.append(btn)
        tr.append(id,name,email,del)
        tbody.append(tr)


    });
}