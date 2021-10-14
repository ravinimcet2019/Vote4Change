var username,password,cpassword,city,address,adhar,email,mobile;
function addUser()
{
    username=$("#username").val();
    password=$("#password").val();
    cpassword=$("#cpassword").val();
    city=$("#city").val();
    address=$("#address").val();
    adhar=$("#adhar").val();
    email=$("#email").val();
    mobile=$("#mobile").val();
    if(validateUser())
    {
    if(password!==cpassword)
    {
        
        swal("Error!","Password do not match","error");
        return ;
    }
    else
    {
        if(checkEmail()===false)
            return ;
        
        if(checkMobile===false)
            return;
        var data={
                  username:username,
                  password:password,
                  city:city,
                  address:address,
                  userid:adhar,
                  email:email,
                  mobile:mobile
        };
        var xhr= $.post("RegistrationControllerServlet",data,processResponse);
        xhr.error(handleResponse);
        
    }
    
}
}
function processResponse(responseText,textStatus,xhr)
{
    var str=responseText.trim();
    if(str==="success")
    {
        swal("Success!","Registraton done successfully! You can now login","success");
        setTimeout(redirectUser,"3000");
    }
    else if(str==="uap")
        swal("Error!","Sorry! The userid is already present","error");
    else
        swal("Error!","Registration Failed","error");
}
function handleResponse(xhr)
{
    swal("Error!","Problem in server communication:"+xhr.statusText,"error");
}
function validateUser()
{
    if(username==="" || password===""|| cpassword===""||city===""||address===""||adhar===""||email===""||mobile==="")
    {
        swal("Error!","All Fields are mandatory","error");
        return false;
    }
    return true;
}
function checkEmail()
{
    var attherate=email.indexOf("@");
    var dotpos=email.indexOf(".");
    if(attherate<1 || dotpos<attherate+2 || dotpos+2>=email.length)
     {
        swal("Error!","Please enter a valid email","error");
        return false;
    }
    return true;   
}
function checkMobile()
{
    
}
function redirectUser()
{
    window.location="login.html";
}


