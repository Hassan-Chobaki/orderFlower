//const e = require("express");

 window.document.addEventListener("DOMContentLoaded",showFirstTime);

function showFirstTime(){
   
   
    document.getElementById('sectionProducts').style.display='none';
    document.getElementById('sectionOrders').style.display='none';
    document.getElementById('cardNewProduct').showModal();
    if(document.getElementById('cardNewProduct').open)
        document.getElementById('cardNewProduct').close();
  
}


//********************************  Orders

document.getElementById('btnProducts').addEventListener('click',products);
document.getElementById('btnOrders').addEventListener('click', orders);
document.getElementById('btnFound').addEventListener('click', actions);
document.getElementById('btnEdit').addEventListener('click',edit);
document.getElementById('btnDel').addEventListener('click',del);
document.getElementById('newProduct').addEventListener('click',newProduct);
document.getElementById('FILE').addEventListener('change',upload);
document.getElementById('codeOrder').addEventListener('input',checkField);
document.getElementById('mobile').addEventListener('input',checkField);
document.getElementById('nameSender').addEventListener('input',checkField);









let isLoadedTable=false;
let isLoadedPanelProducts=false;
let CODE_PRODUCT=0;

async function orders() {


    document.getElementById('sectionOrders').style.display='flex';
    document.getElementById('sectionProducts').style.display='none';



  if(isLoadedTable) return;
    isLoadedTable=true;

  

    const res = await fetch('https://orderflowers.onrender.com/ordersShowList',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });





    const data = await res.json();



    const bod = document.getElementById('tableBody');
    
    let i = 1;
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                                            <td>${i++}</td>
                                            <td>${row.customerName}</td>
                                            <td>${row.receiverName}</td>
                                            <td>${row.codeProduct}</td>
                                            <td>${row.code}</td>
                                            <td>${row.mobile}</td>
                                            <td>${row.phone}</td>                                            
                                            <td>${row.deliveryDate}</td>
                                            <td>${row.startTime}</td>
                                            <td>${row.endTime}</td>
                                            <td>${row.deliveryAddress}</td>
                                            <td>${row.flowerNote}</td>
                                            <td>${row.comments}</td>                                           
                                            
                              
                              `;
        

        
        tr.addEventListener("click", selectThisRow);

        bod.appendChild(tr);

    });
    

    function selectThisRow() {
        document.getElementById('tableOrder').querySelectorAll("tr").forEach(r=>
                                                                            {r.style.backgroundColor=(r.rowIndex%2===0)?"#ffffff":"#e6f5ff"}
                                                                            );
        
        this.style.background='#03811c80';
        document.getElementById("codeOrder").value = this.cells[4].innerText;
        document.getElementById("mobile").value = this.cells[5].innerText;
        document.getElementById("nameSender").value = this.cells[1].innerText;

        document.getElementById('inp_nameSender').value=this.cells[1].innerText;
        document.getElementById('inp_address').value=this.cells[10].innerText;
        document.getElementById('inp_mobile').value=this.cells[5].innerText;
        document.getElementById('inp_tel').value=this.cells[6].innerText;
        document.getElementById('inp_nameReciver').value=this.cells[2].innerText;
        document.getElementById('inp_codeProduct').value=this.cells[3].innerText;
        document.getElementById('inp_deliveryDate').value=this.cells[7].innerText;
        document.getElementById('inp_startTime').value=this.cells[8].innerText;
        document.getElementById('inp_endTime').value=this.cells[9].innerText;
        document.getElementById('inp_flowerNote').value=this.cells[11].innerText;
        document.getElementById('inp_codeOrder').value=this.cells[4].innerText;
        document.getElementById('inp_comment').value=this.cells[12].innerText;
    }


}// function order


async function edit(){


       const nameSender=document.getElementById('inp_nameSender').value;
       const address= document.getElementById('inp_address').value;
       const mobile= document.getElementById('inp_mobile').value;
       const tel= document.getElementById('inp_tel').value;
       const nameReciver= document.getElementById('inp_nameReciver').value;
       const codeProduct= document.getElementById('inp_codeProduct').value;
       const deliveryDate= document.getElementById('inp_deliveryDate').value;
       const startTime= document.getElementById('inp_startTime').value;
       const endTime= document.getElementById('inp_endTime').value;
        const flowerNote=document.getElementById('inp_flowerNote').value;
        const codeOrder=document.getElementById('inp_codeOrder').value;
       const comment= document.getElementById('inp_comment').value;

     
    const res=await fetch('https://orderflowers.onrender.com/orderEdit',{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nameSender:nameSender,mobile:mobile,tel:tel,nameReciver:nameReciver,codeProduct:codeProduct,address:address,deliveryDate:deliveryDate,startTime:startTime,endTime:endTime,flowerNote:flowerNote,codeOrder:codeOrder,comment:comment})

    });

alert('edit');
}





async function del(){

const codeOrder=document.getElementById('inp_codeOrder').value;

const res=await fetch('https://orderflowers.onrender.com/del',{
    method:'DELETE',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({code:codeOrder})
});

if(res.ok)
alert('حذف شد');

} // function del





function actions() {

    document.getElementById('cardShowRecord').style.display='flex';



}

function checkField() {
    const codeOrder = document.getElementById('codeOrder').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const nameSender = document.getElementById('nameSender').value.trim();

    const rows=document.querySelectorAll("#tableOrder tr");

   rows.forEach(r=>{r.style.display=(
                                        r.cells[4].textContent.includes(codeOrder)&&
                                        r.cells[5].textContent.includes(mobile)&&
                                        r.cells[1].textContent.includes(nameSender)
                                    
                                    
                                                                                    )?"":"none"; });

            
        

                    


    

}







//********************************************************************  PRODUCTs
//-----------------------------------------------------------------------------------
//********************************************************************




async function products() {


document.getElementById('cardNewProduct').showModal();
document.getElementById('cardNewProduct').close(); 
document.getElementById('sectionProducts').style.display='flex';
document.getElementById('sectionOrders').style.display='none';



if(isLoadedPanelProducts)
    return;
isLoadedPanelProducts=true;





const res=await fetch('https://orderflowers.onrender.com/productsShowList',{
    method:'GET',
    headers:{'Content-Type':'text/json'},    
})

    const data=await res.json();
    

    let i=1;

    let sectionProducts=document.getElementById('listOfProduct');  
    
  

let listProduct=document.createElement('div');
listProduct.innerHTML='';

listProduct.innerHTML=`<div id="listProduct" style="display:grid;gap:20px;justify-content:center;align-items:center;"></div>`;


document.getElementById('listOfProduct').innerHTML='';

sectionProducts.appendChild(listProduct);
    data.forEach(row => {

        let rowOfProduct=document.createElement('div');
          rowOfProduct.id='rowOfProduct';
        
        

        

        rowOfProduct.innerHTML=` 
                                        <div style="padding:10px;display:grid;" id="${row.codeProduct}">
                                            
                                                <div style="
                                                            flex-direction:column;
                                                            padding:10px;
                                                            background:#84c7f1e0;
                                                            border-radius:20px;
                                                            box-shadow:0 2 5  rgb(0 0 0 0 0);
                                                
                                                
                                                ">


                            <div style="display:grid;grid-template-columns:2fr 2fr;gap:10px;justify-content:center;align-items:center;">
                                                        <div style="display:flex; flex-direction:column; gap:10px; font-size:large">⌘ ${i}
                                                                       <div> نام محصول<input id="inpName${row.codeProduct}" value=${row.name} style="width:10ch;"></div>
                                                                       <div> کدمحصول<input id="inpCode${row.codeProduct}" value=${row.codeProduct} style="width:5ch"></div>
                                                                       <div> قیمت<input id="inpPrice${row.codeProduct}" value=${row.price} style="width:10ch"></div>
                                                        </div>
                                                        

<div style="display:flex;">  

            <img src="${row.address}" style="width:200px;height:200px;border-radius:50%;border:3px double #94b1ce9b;box-shadow:0 2 5  rgb(0 0 0 0 0);">

</div>

</div>

                                                        <hr>



                                              <div style="display:flex;gap:20px;justify-content:center;font-size:xx-large;">
                                                <div id="productDel" onclick="delProduct(${row.codeProduct});" style="cursor:pointer;display:block;background:#FFF00" ; title="حذف محصول";>❌</div>
                                                 <div id="productEdit" onclick="editProduct(${row.codeProduct});" style="cursor:pointer;background:#FFF00" >📝</div>
                                             </div>   




                                                

                                            </div>



                                        </div>
                                            
        
        
                              `;



       sectionProducts.appendChild(document.getElementById('listProduct').appendChild(rowOfProduct));

i++;

    }     
    

);//foreach

if(document.getElementById('listProduct')!==null)
 document.getElementById('listProduct').remove();



}




async function delProduct(codeProduct){


       
if(!confirm('\n\n\n\n\n\n '+'محصول حذف شود؟'+'\n')){
    return;
}
    const r=await fetch('https://orderflowers.onrender.com/confirmProduct',{
        method:'POST',
        headers:{'Content-Type':'text/plain'},
        body:codeProduct
    });

  const answer=await r.text();
    if(answer){
        //document.getElementById(codeProduct).remove();
        isLoadedPanelProducts=false;
        products();
       
    }
    else
        alert('fail delete');
  
}



async function editProduct(codeProduct){
    alert('edit');
    
    const data={
                name:document.getElementById("inpName"+codeProduct).value,
                codeProduct:document.getElementById('inpCode'+codeProduct).value,
                price:document.getElementById('inpPrice'+codeProduct).value
    }
    

console.log(data,'NNNN:',codeProduct);

const codeBefor=codeProduct;
    const result=await fetch('https://orderflowers.onrender.com/editProd',{
        method:'patch',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({data,codeBefor})
    })

    const answer=await result.json();

    if(answer==='successful')
    {

alert('update shooooooood');
    }


}










function newProduct(){
    
  
   
    document.getElementById('cardNewProduct').showModal();
   
    
    
    }





async function addProduct(){                                        


         const data={
                name:document.getElementById('inp_nameProductForAdd').value,
                codeProduct:document.getElementById('inp_codeProductForAdd').value,
                price:document.getElementById('inp_priceProductForAdd').value,
                file:upload()
        }

        const fd=new FormData();
            fd.append('name',data.name);
            fd.append('codeProduct',data.codeProduct);
            fd.append('price',data.price);
            fd.append('file',data.file);
 

if(document.getElementById('inp_nameProductForAdd').value==='' || document.getElementById('inp_codeProductForAdd').value==='' || document.getElementById('inp_priceProductForAdd').value==='' || document.getElementById('choosefile').files.length===0 )
{
   const m= document.getElementById('MESSAGE');
    m.innerHTML='&nbsp⚠&nbsp&nbspلطفا فرم را بطور کامل پرکنید';
      m.style.background="#f60707eb";
        m.style.display='block';

                setTimeout(()=> m.style.display='none',3000);
    return;
}


    
    const res=await fetch('https://orderflowers.onrender.com/newProduct',{
        method:'POST',     
        headers:{'Type-Content':'text/json'},
        body:fd
    })
    
    const result=await res.json();

    

    const m=document.getElementById('MESSAGE');
    
    if(window.innerWidth<=650)
        m.style.width='100%';


    console.log(result);
    
switch(result.ok || result.fail){

    case 'ok':
        m.innerHTML=' '+data.name+'&nbsp✓'+' محصول جدید اضافه شد.   ';
        m.style.background=" #098e09eb";
        
        m.style.display='block';

                setTimeout(()=> m.style.display='none',3000);

    break;



    case 'no':

        m.innerHTML="&nbsp⚠&nbsp&nbspلطفا فرم را بطور کامل پرکنید";
        m.style.background=" #f60707eb";      
        m.style.display='block';

                setTimeout(()=> m.style.display='none',3000);

    break;
    


    case 'fail':
                 m.innerHTML='⚠'+'&nbsp'+'کدمحصول تکراری است';
                 m.style.background=" #f60707eb";
                  m.style.display='block';

                 setTimeout(()=> m.style.display='none',3000);
    break;
}

document.getElementById('choosefile').value='';
document.getElementById('picture').src='';
document.getElementById('inp_nameProductForAdd').value='';
document.getElementById('inp_codeProductForAdd').value='';
document.getElementById('inp_priceProductForAdd').value='';
    
    }



    function upload(){
                                const f=document.getElementById('choosefile');
                                const file=f.files[0];
 
    if(file){
        
        //document.getElementById('inp_nameProductForAdd').value=file.name;
        document.getElementById('picture').src=URL.createObjectURL(file);
        
    }
 

    
    return file;

   
}



function backToMainpageProduct(){
    document.getElementById('cardNewProduct').close(); 


    isLoadedPanelProducts=false;
    products();
    
}
