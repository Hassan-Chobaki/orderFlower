

async function ps() {   


const res=await fetch("http://192.168.1.101:3000/products",{
                                method:"GET",
                                headers:{"Content-Type":"application/json"}
                    });
const data=await res.json();

data.forEach(pics => {
console.log(data);
    const img = document.createElement("img");
    const frame = document.createElement("div");
    const content = document.createElement("p");
    const price=document.createElement("p");
    frame.classList.add("mainFrame");

    console.log("adress="+pics.address);
    console.log("realName="+pics.realname);

    img.src = pics.address;
    img.style.width = "100%";
    img.style.height = "80%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "0px 10px";

    frame.style.borderColor="#ebf5623f";

    content.style.whiteSpace="pre-line";
    content.textContent = pics.name+"\nکد"+pics.codeProduct;
    price.textContent=new Intl.NumberFormat('fa-ir').format(pics.price)+' تومان ';

    content.style.textAlign="center";
    price.style.textAlign="center";




const order=document.createElement("a");

order.textContent="سفارش این محصول";
order.style.fontSize="200%";
order.style.color="#f3ff0c";
order.style.cursor="pointer";
order.style.textShadow="1px 1px 2px black,0 0 1em blue, 0 0 0.2em blue; color: white;"
order.style.transform="scale(1.5)";

order.onclick=()=>{
    const prod={
        code:pics.codeProduct,
        name:pics.name,
        price:pics.price,
        address:pics.address};
    

                        
                    sessionStorage.setItem("selectedProduct",JSON.stringify(prod));console.log(prod);
                    location.href="order.html";

                   }





const detail=document.createElement('a');
detail.style.fontSize='14px';
detail.innerHTML=" &nbsp; مشخصات &nbsp;";
detail.style.position='fixed';
detail.style.left=0;
detail.style.cursor='pointer';

detail.addEventListener('click',()=>{detailOfProduct(pics)});





   frame.append(img,content,price,order,detail);
   
    document.getElementById("mainFrame").appendChild(frame);


img.addEventListener("click", function(){this.requestFullscreen();

});



})//foreach



}


ps();


function detailOfProduct(oneRowProduct){


const cardDetail=document.getElementById('cardDetail');
cardDetail.showModal();
cardDetail.innerHTML=`

<div style='display:column';>

                                                    <h2>    نام محصول <span style='background-color:black;color:white'> ${oneRowProduct.name} </span></h2>
                                                    <h2>     قیمت <span style='background-color:black;color:white'> ${oneRowProduct.price} </span></h2>
                                                    
</div>
                                                    <button 
                                                            style="
                                                                    text-align:center;
                                                                    margin-top:auto;
                                                                    margin-left=50px;
                                                            "
                                                            
                                                            onclick="cardDetail.close();">بازگشت</button>


                        `;



}