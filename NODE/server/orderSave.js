const express = require('express');
const app = express();


const session = require('express-session');
const cors = require("cors");



//********************************************      SAVE FILE IN PUBLIC FOLDER      ********************************************//
const path = require('path');
const multer = require('multer');

require("dotenv").config();



const fs = require('fs/promises');



//**********************************************************************************************************************************




app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

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
    try {
        const update = await db.query('UPDATE orders SET customerName=?,mobile=?,phone=?,receiverName=?,codeProduct=?,deliveryAddress=?,deliveryDate=?,startTime=?,endTime=?,flowerNote=?,code=?,comments=? WHERE code=?'
            , [nameSender, mobile, tel, nameReciver, codeProduct, address, deliveryDate, startTime, endTime, flowerNote, codeOrder, comment, codeOrder]);

        res.json({ ok: true, affectedRows: res.affectedRows });

    } catch (err) {
        res.status(500).json({ err });
        console.log(err);
    }


});



app.delete('/del', async (req, res) => {

    const { code } = req.body;
    try {
        const del = await db.query('DELETE FROM orders WHERE code=?', [code]);
        res.send({ ok: true });
    } catch (err) { console.log(err); }
})



app.get('/productsShowList', async (req, res) => {


    const [rows] = await db.query('SELECT codeProduct,name,price,address,realName FROM products');

    res.json(rows);



});

//////////////////////////////////////////////////////////////////////////////////// DELETE PRODUCT

let row=[];

app.post('/confirmProduct', async (req, res) => {
    const codeProduct = req.body;
     [row]= await db.query('SELECT * FROM products WHERE codeProduct=?', [codeProduct]);
console.log('len of row=',row.length,'\n\t\t\t\t\t\t\t codeProduct=',codeProduct);
   
    if (row.length>0) { res.send('ok');  console.log('confirm AND CODEpRODUCT=',codeProduct,'row=',row,'\n \n \n row[0].realname=',row[0].realName);}
})




                                                const storage = multer.diskStorage({
                                                    destination: function (req, file, cb) { cb(null,'../../public/image'); },
                                                    filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); }
                                                });




app.delete('/delProduct', async (req, res) => {

    const { codeProduct, OkNo } = req.body;

    console.log(codeProduct, OkNo);
    if (OkNo === 'ok')
        try {
           const [resultDel]= await db.query('DELETE FROM products WHERE codeProduct=?', [codeProduct]);
           if(resultDel.affectedRows>0)
                 res.send('del');
           else
                 res.send('fail');
      
           await fs.unlink('../../public/image/' + row[0].realName, err => { console.log('error unlink=',err) });

            console.log('========================', row[0].realName, storage.destination);

        } catch (error) {
                            console.log('ERROR=',error);
                             res.send('no'); return;
                         }

})




const upload = multer({ storage: storage });



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.post('/newProduct', upload.single('file'), async (req, res) => {

    const { name, codeProduct, price } = req.body;
    const ext = path.extname(req.file.originalname);

    const address = req.file.destination + '/' + req.file.filename;
    const file = req.file;
    const realName = req.file.filename;


    try {
        if (name && codeProduct && price && file) {
            await db.execute("INSERT INTO products (name,codeProduct,price,address,realName) VALUES (?,?,?,?,?)", [name, codeProduct, price, address, realName]);
            res.json({ok:'ok'});
            return;
        }
        else {
            res.json({no:'no'});
            return;
        }
    }
    catch (error) {
        res.json({fail:'fail'});
        console.log(error);
    }

});




app.patch('/editProd',(req,res)=>{

    const {name,codeProductBefor,price,codeProductAfter}=req.body;
    console.log('old code',codeProductBefor,'\nnew code:',codeProductAfter);
    const update=db.execute('UPDATE products SET name=?,codeProduct=?,price=? WHERE codeProduct=?',[name,codeProductAfter,price,codeProductBefor]);
    res.json({success:'success'});

})







app.listen(3000, "0.0.0.0", () => {

    console.log('start server....');


});