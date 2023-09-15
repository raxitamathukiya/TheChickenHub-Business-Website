let form=document.querySelector("form")
let email=document.getElementById("email")
let password=document.getElementById("password")

form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(email.value)
    try {
        let obj={
            email:email.value,
            password:password.value
        }  
        let res=await fetch(`https://cff-jqw1.onrender.com/users/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json()
        console.log(data)
        alert(`${data.message} `)
        localStorage.setItem("token",JSON.stringify(data.token))
        localStorage.setItem("name",JSON.stringify(data.name))
        if(data.name=="admin"){
            window.location="admin.html"
        }else{
            window.location="index.html"
        }
       
    } catch (error) {
        console.log(error)
    }
})
