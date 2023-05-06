let main=document.getElementById("all_product")


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

function display(data){
    main.innerHTML=""
    data.forEach(element => {
        let div=document.createElement("div")
        div.setAttribute("class","card")
        let img=document.createElement('img')
        img.setAttribute("src",element.image)
        let title=document.createElement("h4")
        title.innerText=element.title
        let des=document.createElement("p")
        des.innerText=element.discription
        let price=document.createElement("h4")
        price.innerText="₹ "+element.price
        let cat=document.createElement("p")
         cat.innerText="🔺"+ ' Non veg'
         let button =document.createElement("button")
         button.innerText="Add To Cart"
        div.append(img,title,cat,price,des ,button)
        main.append(div)



    });
}