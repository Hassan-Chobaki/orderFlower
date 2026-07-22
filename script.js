/*const { json } = require("express");


   */


let weekDayName=new Intl.DateTimeFormat('fa-ir',{weekday:'long'}).format(new Date());     
let monthName=new Intl.DateTimeFormat('fa-ir',{month:'long'}).format(new Date());
document.getElementById('nameDays').innerHTML+='امروز'+weekDayName+ " ماه "+monthName;



let prod=JSON.parse(sessionStorage.getItem("selectedProduct"));

if(prod)
{
 
    const select=document.getElementById('codeProduct');
    const option=document.createElement("option");
   option.value =prod.code;
   option.textContent=prod.code;
   select.appendChild(option);
    document.getElementById('preview').src=prod.address;
    
    sessionStorage.clear();
    prod={};
   
}else
    fillRecord();

async function fillRecord() {
    
const res=await fetch ("https://orderflowers.onrender.com/products");//,{method:'GET',headers:{'Content-Type':'Application-json'}});
const data= await res.json();
   
 const elementSelect=document.getElementById("codeProduct");
data.forEach(pic => {
   
    const item=document.createElement("option");
    item.value=pic.codeProduct;
    item.textContent=pic.codeProduct;    
    item.dataset.address=pic.address;
    elementSelect.appendChild(item);
    
});


                        
                    const select=document.getElementById('codeProduct');
                    const preview=document.getElementById('preview');
                            const option=select.options[select.selectedIndex];
                            preview.src=option.dataset.address;console.log(option.dataset.address);
                    

}



const select=document.getElementById('codeProduct');
const preview=document.getElementById('preview');

select.addEventListener('change',()=>{
                            const option=select.options[select.selectedIndex];
                            preview.src=option.dataset.address;
                        });

                       




document.addEventListener('DOMContentLoaded', function() {


   

        const customerName=document.getElementById('customerName');
        const mobile=document.getElementById('mobile');
        const phone=document.getElementById('phone');
        const receiverName=document.getElementById('receiverName');
        const deliveryAddress=document.getElementById('deliveryAddress');
        const deliveryDate=document.getElementById('deliveryDate');
        const startTime=document.getElementById('startTime');
        const endTime=document.getElementById('endTime');
        const flowerNote=document.getElementById('flowerNote');
        const comments=document.getElementById('comments');
        const codeProduct=document.getElementById('codeProduct');
        


    const btn = document.getElementById('btn');
   btn.setAttribute('type', 'button'); // جلوگیری از ارسال فرم به صورت پیش‌فرض    
    

    function convertTo24(timeStr) {
        if (!timeStr) return null;

        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');

        hours = parseInt(hours, 10);

        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        }

        if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        return hours * 60 + parseInt(minutes, 10);
    }

    function checkTime() {
        const start = convertTo24(startTime.value);
        const end = convertTo24(endTime.value);

        if (start !== null && end !== null && start > end) {
            alert('زمان شروع نمی‌تواند از زمان پایان بیشتر باشد');
            return false; // مهم
        }

        return true; // یعنی مشکلی نیست
    }

    // چک هنگام تایپ
    startTime.addEventListener('input', checkTime);
    endTime.addEventListener('input', checkTime);

    
                            btn.addEventListener('click', function (e) {
                                if (!checkTime()) {
                                    e.preventDefault(); // جلوگیری از ارسال فرم
                                    return;
                                }
                                if(customerName.value.trim() === '' || mobile.value.trim() === '' || phone.value.trim() === '' || receiverName.value.trim() === '' || deliveryAddress.value.trim() === '' || deliveryDate.value.trim() === '' || startTime.value.trim() === '' || endTime.value.trim() === ''||codeProduct.value.trim()==='') {
                                 alert('لطفا تمام فیلدها را پر کنید');
                                 return;    
                                
                                }

                                const Data={                                                                   
                                    customerName:customerName.value,
                                    mobile:mobile.value,
                                    phone:phone.value,
                                    receiverName:receiverName.value,
                                    deliveryAddress:deliveryAddress.value,
                                    deliveryDate:deliveryDate.value,
                                    startTime:startTime.value,
                                    endTime:endTime.value,
                                    flowerNote:flowerNote.value,
                                    comments:comments.value,
                                    codeProduct:codeProduct.value
                                };


async function sendData() {
                         try{


                                const result=await fetch('https://orderflowers.onrender.com/orderSave',{
                                    method:'POST',
                                    headers:{   
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(Data)
                                });


                             const response=await result.json();
                             
                             sessionStorage.setItem('orderCode', response.code);
                            location.href="promtPage.html?msg=register";
                            

                        }
                        catch(error){
                            alert('خطای سمت سرور');
                            return;
                           }          



                    }//sendData

                    sendData();

 
                                
                        
                                
                            });



});
