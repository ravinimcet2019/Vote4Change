function redirectadministratorpage()
{
    swal("Admin!","Redirecting To Admin Actions Page!","success").then(function(value)
    {
        window.location="adminactions.jsp";
    });
}
function redirectvotingpage()
{
    swal("Admin!","Redirecting To Voting Controller Page!","success").then(function(value){
        window.location="VotingControllerServlet";
    });
}
function manageuser()
{
    swal("Admin!","Redirecting To User Management Page!","success").then(function(value){
        window.location="manageuser.jsp";
    });
}
function managecandidate()
{
    swal("Admin!","Redirecting To Candidate Management Page!","success").then(function(value){
        window.location="managecandidate.jsp";
    });
}
function electionresult()
{
    $.post("ElectionResultControllerServlet",null,function(responseText)
    {
        swal("Result Fatched","Success","success");
        $("#result").html(responseText.trim());
    });
}

function showaddcandidateform()
{
removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Add New Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><input type='text' id='cid'></td></tr>\n\
<tr><th>User Id:</th><td><input type='text' id='uid' onkeypress='return getdetails(event)'></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Add Candidate' onclick='addcandidate()' id='addcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
 data={id:"getid"};   
 $.post("AddCandidateControllerServlet",data,function(responseText){$("#cid").val(responseText);
     $('#cid').prop("disabled",true);});
}
function getdetails(e)
{
    if(e.keyCode===13)
    {
        data={uid:$("#uid").val()};
        $.post("AddCandidateControllerServlet",data,function(responseText)
        {
          var details=JSON.parse(responseText);
          var city=details.city;
          var uname=details.username;
          if(uname==="wrong")
          {
              swal("Wrong Adhar No.","Adhar no. is invalid","error");
              $("#cname").val("");
              $("#city").empty();
          }
          else
          {
              $("#cname").val(uname);
              $("#city").empty();
              $("#city").append(city);
              $("#cname").prop("disabled",true);
          }
        });
        }
 }
function clearText()
{
    $("#addresp").html();
    data={id:"getid"};   
    $.post("AddCandidateControllerServlet",data,function(responseText){$("#cid").val(responseText);
     $('#cid').prop("disabled",true);});
    
}
function clearTexts()
{
    $("#addresp").html();
    $.post("ShowCandidateControllerServlet",data,function(responseText){
    var candidlist=JSON.parse(responseText);
    $("#cid").append(candidlist.cid);
  });
   
}
function addcandidate()
{
     var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
data.append("cid",cid);
data.append("uid",uid);
data.append("cname",cname);
data.append("party",party);
data.append("city",city);
$.ajax({
            type: "POST",
enctype: 'multipart/form-data',
            url: "AddNewCandidateControllerServlet",
            data: data,
processData: false,
contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                str=data+"....";
swal("Admin!", str, "success").then(function(value){
showaddcandidateform();
    });
    },
            error: function (e) {
swal("Admin!", e, "error");
                }
        });
}

function showupdatecandidateform()
{
    removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Update Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><div><select id='cid'></select></div></td></tr>\n\
<tr><th>User Id:</th><td><input type='text' id='uid'></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Update Candidate' onclick='updatecandidate()' id='addcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearTexts()'></th></tr></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='updateresp'></span>";
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
 data={data:"cid"};    
$.post("ShowCandidateControllerServlet",data,function(responseText){
    var candidlist=JSON.parse(responseText);
    $("#cid").append(candidlist.cid);
  });
  $("#cid").change(function(){
    var cid=$("#cid").val();
    if(cid==='')
    {
        swal("No Selection","Please select An Id","error");
        $("#uid").val("");
            $("#cname").val("");
            $("#city").empty();
        return;
    }
    
data={data:cid};    

$.post("UpdateCandidateControllerServlet",data,function(responseText){
        var details=JSON.parse(responseText);
          var uid=details.uid;
          var city=details.city;
          var uname=details.username;
            $("#uid").val(uid);
            $("#cname").val(uname);
            $("#city").empty();
            $("#city").append(city);
            $("#uid").prop("disabled",true);
            $("#cname").prop("disabled",true);
  });
          
            
}); 
    
}

function updatecandidate()
{
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("party",party);
    data.append("city",city);
    $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "UpdateNewCandidateControllerServlet",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                str=data+"....";
                swal("Upadeted!", str, "success").then(function(value){
                showupdatecandidateform();
                });
            },
            error: function (e) {
            swal("Admin!", e, "error");
            }
            });
}

function showcandidate()
{
    removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Show Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white;font-weight:bold;'>Candidate Id:</div><div><select id='cid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";                
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
data={data:"cid"};    
$.post("ShowCandidateControllerServlet",data,function(responseText){
    var candidlist=JSON.parse(responseText);
    $("#cid").append(candidlist.cid);
  });
  
$("#cid").change(function(){
    var cid=$("#cid").val();
    if(cid==='')
    {
        swal("No Selection","Please select An Id","error");
        $("#addresp").append().empty();
        return;
    }
    
data={data:cid};    
$.post("ShowCandidateControllerServlet",data,function(responseText){
    clearTexts();
    var details=JSON.parse(responseText);
    $("#addresp").append().empty();
    $("#addresp").append(details.subdetails);
  });
          
            
}); 
    
}
function deletecandidate()
{
   removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Show Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><div><select id='cid'></select></div></td></tr>\n\
<tr><th><input type='button' value='Delete Candidate' onclick='todeletecandidate()' id='addcnd'></th>\n\
</table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";                
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
data={data:"cid"};    
$.post("ShowCandidateControllerServlet",data,function(responseText){
    var candidlist=JSON.parse(responseText);
    $("#cid").append(candidlist.cid);
  });
  
$("#cid").change(function(){
    var cid=$("#cid").val();
    if(cid==='')
    {
        swal("No Selection","Please select An Id","error");
        $("#addresp").append().empty();
        return;
    }
    
data={data:cid};    
$.post("ShowCandidateControllerServlet",data,function(responseText){
    clearTexts();
    var details=JSON.parse(responseText);
    $("#addresp").append().empty();
    $("#addresp").append(details.subdetails);
  });
          
            
}); 
}
function todeletecandidate()
{
    
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
data.append("cid",cid);
data.append("uid",uid);
data.append("cname",cname);
data.append("party",party);
data.append("city",city);
$.ajax({
            type: "POST",
enctype: 'multipart/form-data',
            url: "DeleteCandidateControllerServlet",
            data: data,
processData: false,
contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                str=data+"....";
swal("Delete!", str, "success").then(function(value){
deletecandidate();
    });
    },
            error: function (e) {
swal("Admin!", e, "error");
                }
        });
}

function removecandidateForm()
{
    var contdiv=document.getElementById("result");
    var formdiv=document.getElementById("candidateform");
    if(formdiv!==null)
    {
        $("#candidateform").fadeOut(3500);
        contdiv.removeChild(formdiv);
    }
}