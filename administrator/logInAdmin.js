const form=document.getElementById('loginForm');

form.addEventListener('submit',async(e)=>{

    e.preventDefault();
    let Data={
                username:document.getElementById('username').value
                ,
                password:document.getElementById('password').value
    };





                        let res=await fetch("http://192.168.1.101:3000/admin/login",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(Data)
                            ,credentials:"include"
                        });







                                                            let result=await res.json();
                                                            console.log(result);
                                                            if(result.success)
                                                                location.href='http://192.168.1.101:3000/path-rootuser';
                                                            else
                                                            {
                                                                alert("اشکال");
                                                            }


});//form.listener