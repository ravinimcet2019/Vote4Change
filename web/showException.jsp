<%-- 
    Document   : showException
    Created on : 30 May, 2021, 1:48:11 AM
    Author     : dell
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
  Exception ex=(Exception)request.getAttribute("Exception");
  System.out.println("Exception is:"+ex);
  out.println("Some Exception Occured:"+ex.getMessage());
    
    %>
