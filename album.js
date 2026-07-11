
async function ps() {
    


const res=await fetch("http://192.168.1.103:3000/products",{
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
    price.textContent=pics.price;

    content.style.textAlign="center";
    price.style.textAlign="center";

const order=document.createElement("a");

order.textContent="سفارش این محصول";
order.style.fontSize="200%";
order.style.color="#f3ff0c";
order.style.cursor="pointer";
order.style.textShadow="1px 1px 2px black,0 0 1em blue, 0 0 0.2em blue; color: white;"
order.style.transform="scale 2;";

order.onclick=()=>{
    const prod={
        code:pics.codeProduct,
        name:pics.name,
        price:pics.price,
        address:pics.address};
    

                        
                    sessionStorage.setItem("selectedProduct",JSON.stringify(prod));console.log(prod);
                    location.href="order.html";

                   }


   frame.append(img,content,price,order);
   
    document.getElementById("mainFrame").appendChild(frame);


img.addEventListener("click", function(){this.requestFullscreen();

});



})



}
ps();
