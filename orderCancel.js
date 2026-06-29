

document.getElementById('submitBtn').addEventListener("click",deleteOrder);
             
              
            


async function deleteOrder() {
    
let promt="fail";
    
            const mobile=document.getElementById('mobile').value;
            const code=document.getElementById('code').value;
            if(!mobile&&!code)
            {
                const popupNfill=document.getElementById('popupNfill');
                popupNfill.style.display="block";
                setTimeout(()=>{
                    popupNfill.style.display="none";
                },3000);
                return;
                
            }

                            const response=await fetch("http://192.168.1.101:3000/deleteOrder",{
                                method:"POST",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify({mobile:mobile,code:code})


                            });

                         promt=await response.text();
console.log(promt);
                        
if(promt==='success')
{

window.location.href="promtPage.html?msg=cancel" ;
}
else if(promt==='not found'){
    

    const popupNfound=document.getElementById('popupNfound');
    popupNfound.style.display="block";
    setTimeout(() => {
        popupNfound.style.display="none";
    }, 3000);
}
else if(promt==='not fill')
{
    const popupNfill=document.getElementById('popupNfill');
    popupNfill.style.display="block";
    setTimeout(()=>{
        popupNfill.style.display="none";
    },3000);

}



                    
                    

    
}            

