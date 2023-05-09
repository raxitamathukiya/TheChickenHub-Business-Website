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
          count.innerText=c
    } catch (error) {
        console.log(error)
    }
}
const form = document.getElementById('address-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const fullname = document.getElementById('fullname').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const pincode = document.getElementById('Pincode').value;
  const mobilenumber = document.getElementById('MobileNumber').value;
  
  
  
  console.log(fullname, address, city, state, pincode,mobilenumber);
  window.location.href="invoice.html"
});
let start_order=document.getElementById('start_order')
start_order.addEventListener("click",async()=>{
    window.location="./product.html"
})