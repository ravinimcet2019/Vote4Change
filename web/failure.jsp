<%-- 
    Document   : success
    Created on : 8 Jun, 2021, 11:44:07 PM
    Author     : dell
--%>

<%
    String userid=(String)session.getAttribute("userid");
            if(userid==null)
            {
                session.invalidate();
                response.sendRedirect("accessdenied.html");
                return;
            }
            out.println("failed");
    %>