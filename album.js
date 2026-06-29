
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
