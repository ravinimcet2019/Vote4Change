<%-- 
    Document   : adminshowcandidate
    Created on : 9 Jun, 2021, 1:24:38 AM
    Author     : dell
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="org.json.JSONObject"%>
<%@page import="evoting.dto.CandidateDetails"%>
<%@page import="java.util.ArrayList"%>
<%
    String userid=(String)session.getAttribute("userid");
            if(userid==null)
            {
                response.sendRedirect("accessdenied.html");
                return;
            }
         StringBuffer displayBlock =new StringBuffer();  
         String result=(String)request.getAttribute("result");
         if(result!=null&&result.equalsIgnoreCase("candidatelist"))
         {
             ArrayList<String> candidateId=(ArrayList<String>)request.getAttribute("candidateid");     
             displayBlock.append("<option value=''>Choose ID</option>");
             for(String c:candidateId)
             {
                 displayBlock.append("<option value='"+c+"'>"+c+"</option>");
             }
             JSONObject json =new JSONObject();
             json.put("cid",displayBlock.toString());
             out.println(json);
             System.out.println("In adminshowcand");
             System.out.println(displayBlock);
         }
    
%>
