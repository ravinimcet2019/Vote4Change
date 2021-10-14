   <%-- 
    Document   : loginresponse
    Created on : 2 Jun, 2021, 3:25:51 PM
    Author     : dell
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String userid=(String)request.getAttribute("userid");
    String result=(String)request.getAttribute("result");
    if(userid!=null && result!=null)
    {
        HttpSession sess=request.getSession();
        sess.setAttribute("userid", userid);
        String url="";
        if(result.equalsIgnoreCase("admin"))
            url="AdminControllerServlet;jsessionid="+sess.getId();
        else
            url="VotingControllerServlet;jsessionid="+sess.getId();
        out.println(url);
    }
    else
        out.println("error");
%>
