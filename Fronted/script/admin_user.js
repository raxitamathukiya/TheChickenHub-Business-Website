let tbody=document.getElementById("tbody")

fetchdata()
async function fetchdata(){
    try {
        let res=await fetch(`http://localhost:8080/users/get`,{
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
        let del=document.createElement("button")
        id.innerText=element._id
        name.innerText=element.name
        email.innerText=element.email
        del.innerText="DELETE"
        tr.append(id,name,email,del)
        tbody.append(tr)


    });
}