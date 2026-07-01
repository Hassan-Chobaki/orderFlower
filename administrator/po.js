window.document.addEventListener("DOMContentLoaded",showFirstTime);

function showFirstTime(){
   
    document.getElementById('sectionProducts').style.display='none';
}


//********************************  PRODUCTS

document.getElementById('btnProducts').addEventListener('click',products);
document.getElementById('btnOrders').addEventListener('click', orders);
document.getElementById('btnFound').addEventListener('click', actions);
document.getElementById('btnEdit').addEventListener('click',edit);
document.getElementById('btnDel').addEventListener('click',del);
document.getElementById('newProduct').addEventListener('click',newProduct);
document.getElementById('FILE').addEventListener('change',upload);


let isLoadedTable=false;
let isLoadedPanelProducts=false;
let CODE_PRODUCT=0;

async function orders() {


    document.getElementById('sectionOrders').style.display='flex';
    document.getElementById('sectionProducts').style.display='none';

    if(isLoadedTable) return;
    isLoadedTable=true;

  

    const res = await fetch('/ordersShowList',
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

     
    const res=await fetch('/orderEdit',{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nameSender:nameSender,mobile:mobile,tel:tel,nameReciver:nameReciver,codeProduct:codeProduct,address:address,deliveryDate:deliveryDate,startTime:startTime,endTime:endTime,flowerNote:flowerNote,codeOrder:codeOrder,comment:comment})

    });

alert('edit');
}





async function del(){

const codeOrder=document.getElementById('inp_codeOrder').value;

const res=await fetch('/del',{
    method:'DELETE',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({code:codeOrder})
});

if(res.ok)
alert('حذف شد');

} // function del





function actions() {



}

function checkField() {
    const codeOrder = document.getElementById('codeOrder').value;
    const mobile = document.getElementById('mobile').value;
    const nameSender = document.getElementById('nameSender').value;

    if(codeOrder==='' && mobile==='' && nameSender==='')
        alert('EJRA SHOD FUNC checkfield');

document.getElementById('cardShowRecord').style.display='flex';
    

}



//********************************************************************  PRODUCTs
//-----------------------------------------------------------------------------------
//********************************************************************


async function products() {



document.getElementById('sectionProducts').style.display='flex';
document.getElementById('sectionOrders').style.display='none';
document.getElementById('cardNewProduct').style.display='none';


if(isLoadedPanelProducts)
    return;
isLoadedPanelProducts=true;
const res=await fetch('/productsShowList',{
    method:'GET',
    headers:{'Content-Type':'text/json'},    
})

    const data=await res.json();
    console.log(data);

    let i=1;

    let sectionProducts=document.getElementById('sectionProducts');
sectionProducts.style.display='flex';
sectionProducts.style.flexDirection='column';
  
    


    data.forEach(row => {

        
        
        let rowOfProduct=document.createElement('div');

        

        rowOfProduct.innerHTML=` 
                                        <div style="padding:10px;" id="${row.codeProduct}">
        
                                                <div style="
                                                            flex-direction:column;
                                                            padding:10px;
                                                            background:#007bffb3;
                                                            border-radius:20px;
                                                            box-shadow:0 2 5  rgb(0 0 0 0 0);
                                                
                                                
                                                ">

                                                        <div style="display:flex; flex-direction:column; gap:10px; font-size:large">⌘ ${i}♣<div> نام محصول<input value=${row.name} style="width:10ch;"></div>
                                                                       <div> کدمحصول<input value=${row.codeProduct} style="width:5ch"></div>
                                                                       <div> قیمت<input value=${row.price} style="width:10ch"></div>
                                                        </div>
                                                        <hr>



                                              <div style="display:flex;gap:20px;justify-content:center;font-size:xx-large;">
                                                <div id="productEdit" onclick="delProduct(${row.codeProduct});" style="cursor:pointer;display:block;background:#FFF00" >❌</div>
                                                 <div id="productDel" onclick="editProduct();" style="cursor:pointer;background:#FFF00" >📝</div>
                                             </div>   




                                                </div>
                                        </div>
                                            
        <div>  

            <img src="url:orderFlower                          /public/image/1.jpg">

        </div>
        
                              `;



       sectionProducts.appendChild(document.getElementById('listProduct').appendChild(rowOfProduct));

i++;

        
    }

);//foreach


document.getElementById('listProduct').remove();




}




async function delProduct(codeProduct){

    const r=await fetch('/confirmProduct',{
        method:'POST',
        headers:{'Content-Type':'text/plain'},
        body:codeProduct});

    const confirmDel=await r.text();
    

    if(confirmDel!=='ok')
    {
        alert('پیدانشد');
        return;
    }else
        
if(!confirm('محصول حذف شود؟')){
    return;
}

    const result=await fetch('/delProduct',{

        method:'delete',
        headers:{'Content-Type':'Application/json'},
        body:JSON.stringify({codeProduct:codeProduct,OkNo:confirmDel})

    });

    const answer=await result.text();

    if(answer==='del'){
        document.getElementById(codeProduct).remove();
        isLoadedPanelProducts=false;
        products();
    }
    else
        alert('fail delete');
  
}



function editProduct(){alert('edit');}


function newProduct(){
    
    document.getElementById('sectionProducts').style='display:flex;width:100%;height:100%;background:#555555e5;flex:1;flex-wrap:wrap;z-index:555;overflow-y:auto;position:fixed';
    
    document.getElementById('cardNewProduct').style.display='flex';
   
    
    
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


    
    const res=await fetch('/newProduct',{
        method:'POST',        
        body:fd
    })
    
    const result=await res.json();

    console.log(data.file);

    const m=document.getElementById('MESSAGE');

switch(result){

    case 'ok':
        document.getElementById('MESSAGE').innerHTML='\t ⚠'+data.name+'\tمحصول جدید اضافه شد';
        
        m.style.display='block';

                setTimeout(()=> m.style.display='none',2000);

    break;



    case 'no':

                 document.getElementById('MESSAGE').innerHTML='⚠لطفا فرم را بطور کامل پرکنید';
              
        m.style.display='block';

                setTimeout(()=> m.style.display='none',2000);

    break;
    


    case 'fail':
                 document.getElementById('MESSAGE').innerHTML=' ⚠خطای سرور\n-احتمالاکدمحصول تکراری است  ';
                 
                  m.style.display='block';

                 setTimeout(()=> m.style.display='none',2000);
    break;
}
   
    }



    function upload(){
                                const f=document.getElementById('choosefile');
                                const file=f.files[0];

console.log(file.size);
            return file;

    }