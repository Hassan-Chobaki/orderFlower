const express = require('express');
const app = express();

const session = require('express-session');
const cors = require("cors");

const path = require('path');

require("dotenv").config();

app.use(express.json());
app.use(express.text());

app.use(cors({
    origin: true,
    credentials: true
}));





app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}));





app.use(express.static(path.join(__dirname, "../../")));
app.use('/administrator', express.static(path.join(__dirname, '../../administrator')));

app.use(express.static("public"));


const db = require('./db');
const { ok } = require('assert');
const console = require('console');
const { send } = require('process');










app.post("/orderSave", async (req, res) => {

    const code = Math.floor(Math.random() * 100000);


    try {
        const { customerName, mobile, phone, receiverName, deliveryAddress, deliveryDate, startTime, endTime, flowerNote, comments, codeProduct } = req.body;


        console.log(code);
        console.log(req.body);

        if (customerName && mobile && receiverName && deliveryAddress && deliveryDate && startTime && endTime && codeProduct) {
            await db.execute('INSERT INTO orders (code,customerName,mobile,phone,receiverName,deliveryAddress,deliveryDate,startTime,endTime,flowerNote,comments,codeProduct) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                [code, customerName, mobile, phone, receiverName, deliveryAddress, deliveryDate, startTime, endTime, flowerNote, comments, codeProduct]
            );








            res.json({ code: code });
            console.log(req.body);


        }
        else {
            res.status(400).json({ message: 'لطفا تمام فیلدها را پر کنید' });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: 'خطا در ثبت سفارش' });
        return;
    }








});




app.post("/deleteOrder", async (req, res) => {

    let promt = "";

    const code = req.body.code;
    const mobile = req.body.mobile;

    console.log(`code is=${code}....mobile is=${mobile} promt= ${promt}`);

    if (mobile && code) {

        const [exe] = await db.execute("DELETE FROM orders WHERE code = ? AND mobile=?", [code, mobile]);
        if (exe.affectedRows > 0) { res.send('success'); return; }
        else { res.send('not found'); return; }


    } else { res.send('not fill'); }





});









app.get("/products", async (req, res) => {

    const [row] = await db.query('SELECT * FROM products');
    res.json(row);



});






app.post("/admin/login", (request, result) => {


    console.log('login req');

    const { username, password } = request.body;

    if (username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASS
    ) {
        request.session.admin = true;

        console.log('mobilee 2 omad');

        result.json({ success: true });


        return;
    }
    else {
        result.status(401).json({ success: false });
    }

});




// **** SECRET PATH DASHBOARD ADMINISTRATOR
app.get('/path-rootuser', (req, res) => {

    if (req.session.admin !== true) {
        console.log('mobile amad');
        res.status(403).send("Access denide!");
        return;
    }

    // res.sendFile("C:/Users/HcH/Desktop/Node/project_order_flower/orderFlower/administrator/dashboard.html");
    res.sendFile(path.join(__dirname, "../../administrator/dashboard.html"));

});





app.get('/ordersShowList', async (req, res) => {

    const [row] = await db.query('SELECT * FROM orders');
    res.json(row);
    console.log(row);
});





app.patch('/orderEdit', async (req, res) => {

    const {

        nameSender,
        mobile,
        tel,
        nameReciver,
        codeProduct,
        address,
        deliveryDate,
        startTime,
        endTime,
        flowerNote,
        codeOrder,
        comment


    } = req.body;
   try{ 
    const update=await db.query('UPDATE orders SET customerName=?,mobile=?,phone=?,receiverName=?,codeProduct=?,deliveryAddress=?,deliveryDate=?,startTime=?,endTime=?,flowerNote=?,code=?,comments=? WHERE code=?'
        ,[nameSender,mobile,tel,nameReciver,codeProduct,address,deliveryDate,startTime,endTime,flowerNote,codeOrder,comment,codeOrder]);

    res.json({ok:true,affectedRows:res.affectedRows});

   }catch(err){
    res.status(500).json({err});
    console.log(err);
   }


});



app.delete('/del',async(req,res)=>{

const {code}=req.body;
try{
const del=await db.query('DELETE FROM orders WHERE code=?',[code]);
res.send({ok:true});
}catch(err){console.log(err);}
})



app.get('/productsShowList',async(req,res)=>{


    const [rows]=await db.query('SELECT codeProduct,name,price FROM products');

    res.json(rows);

    
    
  });


app.post('/confirmProduct',async(req,res)=>{
    const codeProduct=req.body;
    const OkNo=await db.query('SELECT * FROM products WHERE codeProduct=?',[codeProduct]);
    console.log('confirm AND CODEpRODUCT=',OkNo,codeProduct);
    if(OkNo)
    {res.send('ok');}
})  



app.delete('/delProduct',async(req,res)=>{

const {codeProduct,OkNo}=req.body;

console.log(codeProduct,OkNo);
if(OkNo==='ok')
try{
await db.query('DELETE FROM products WHERE codeProduct=?',[codeProduct]);res.send('del');
}catch(error){res.send('no');return;}



})






app.listen(3000, "0.0.0.0", () => {

    console.log('start server....');


});