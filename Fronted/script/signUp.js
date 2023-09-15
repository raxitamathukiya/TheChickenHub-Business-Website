let form=document.querySelector("form")
let name=document.getElementById("name")
let age=document.getElementById("age")
let email=document.getElementById("email")
let password=document.getElementById("password")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    
        let obj={
            name:name.value,
            age:age.value,
            email:email.value,
            password:password.value
        }
         console.log(obj) 
        fetch(`https://cff-jqw1.onrender.com/users/register`,{
            method:"POST",
            mode:"cors",
            headers:{
                
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
            alert("registration successfully done!!!!!!!")
            window.location="signIn.html"
        }).catch((error)=>{
            console.log(error)
        })

        
       
    
})
