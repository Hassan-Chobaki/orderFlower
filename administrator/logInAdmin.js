const form=document.getElementById('loginForm');

form.addEventListener('submit',async(e)=>{

    e.preventDefault();
    let Data={
                username:document.getElementById('username').value
                ,
                password:document.getElementById('password').value
    };





                        let res=await fetch("admin/login",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(Data)
                            ,credentials:"include"
                        });







                                                            let result=await res.json();
                                                            console.log(result);
                                                            if(result.success)
                                                                location.href='/path-rootuser';
                                                            else
                                                            {
                                                                alert("اشکال");
                                                            }


});//form.listener
