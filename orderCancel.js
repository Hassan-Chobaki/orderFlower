
document.getElementById('submitBtn').disabled=true;
document.getElementById('submitBtn').addEventListener("click",deleteOrder);
document.getElementById('btnCheck').addEventListener("click",checkStatus);


async function checkStatus() {
    const mobile=document.getElementById('mobile').value;
    const code=document.getElementById('code').value;


    const result=await fetch("http://192.168.1.101:3000/checkStatus",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({mobile:mobile,code:code})
    });



    if(!mobile&&!code)
    {

        const popupNfound=document.getElementById('popupNfillOne');        
        popupNfound.style.display="block";
        setTimeout(() => {
        popupNfound.style.display="none";
        }, 3000);
        return;
    }







    if(result.ok)
    {
        const data=await result.json();
        document.getElementById('submitBtn').disabled=false;
                                                                        const s=data.data.statusOrder;
                                                                        let msg='درحال بررسی';
                                                                        switch (s){
                                                                        case '0':
                                                                                 msg=' بررسی';
                                                                            break;
                                                                        case '1':
                                                                                 msg='ارسال';
                                                                                break;
                                                                         case '2':
                                                                                 msg='باموفقیت ارسال شد';
                                                                                
                                                                                break;
                                                                        case '3':
                                                                                msg=' لغو';
                                                                                 
                                                                            break;

                                                                                    
                                                                        }
        const popupNfound=document.getElementById('popupNfillOne');
         popupNfound.innerHTML=data.data.customerName+"<span style='font-weight: bolder;color=green'>✅ مشتری عزیز</span>سفارش شما درمرحله"+'&nbsp'+msg+'&nbsp'+'است'    ;
         
        popupNfound.style.display="block";
        setTimeout(() => {
        popupNfound.style.display="none";
        }, 20000);

        
    }
    else{

         const popupNfound=document.getElementById('popupNfillOne');
         popupNfound.innerHTML="<span style='font-weight: bolder;'> ⚠ </span>سفارشی با این مشخصات یافت نشد";             
        popupNfound.style.display="block";
        setTimeout(() => {
        popupNfound.style.display="none";
        }, 3000);
        return;
    }
}
             
              
            


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

            if(!confirm('آیاازلغو سفارش اطمینان دارید؟'))
                return 0;


                            const response=await fetch("http://192.168.1.101:3000/deleteOrder",{
                                method:"POST",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify({mobile:mobile,code:code})


                            });

                         promt=await response.text();

                        
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

