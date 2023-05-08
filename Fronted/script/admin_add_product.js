let form=document.querySelector("form")


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    
        let obj={
            title:form[0].value,
            image:form[1].value,
            price:form[2].value,
            category:form[3].value,
            discription:form[4].value,
        }
         console.log(obj) 
        fetch(`http://localhost:8080/product/add`,{
            method:"POST",
            headers:{
                
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
            alert("New product added !!!!!!!")
            window.location="admin_product.html"
        }).catch((error)=>{
            console.log(error)
        })

        
       
    
})
