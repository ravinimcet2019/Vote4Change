/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.CandidateDTO;
import evoting.dto.CandidateDetails;
import evoting.dto.CandidateInfo;
import evoting.dto.UpdateCandidateDTO;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;

/**
 *
 * @author dell
 */
public class CandidateDAO {
    private static PreparedStatement ps,ps1,ps2,ps3,ps4,ps5,ps6,ps7,ps8;
    private static Statement st;
    static
    {
        try
        {
            st=DBConnection.getConnection().createStatement();
            ps=DBConnection.getConnection().prepareStatement("Select max(candidate_id) from candidate");
            ps1=DBConnection.getConnection().prepareStatement("Select username from user_details where adhar_no=?");
            ps2=DBConnection.getConnection().prepareStatement("Select distinct city from user_details");
            ps3=DBConnection.getConnection().prepareStatement("Insert into  candidate values(?,?,?,?,?)");
            ps4=DBConnection.getConnection().prepareStatement("Select * from candidate where candidate_id=?");
            ps5=DBConnection.getConnection().prepareStatement("Select USER_ID from candidate where candidate_id=?");
            ps6=DBConnection.getConnection().prepareStatement("update candidate set city=?,party=?,symbol=? where CANDIDATE_ID=?");
            ps7=DBConnection.getConnection().prepareStatement("Delete from candidate where CANDIDATE_ID=?");
            ps8=DBConnection.getConnection().prepareStatement("select  candidate_id,username,party,symbol from candidate,user_details where candidate.user_id=user_details.adhar_no and candidate.city=(select city from user_details where adhar_no=?)");
        }
        catch(SQLException ex)
        {
            ex.printStackTrace();
        }
    }
    
    public static String getNewId()throws SQLException
    {
        ResultSet rs=ps.executeQuery();
        rs.next();
            String cid=rs.getString(1);
            if(cid==null)
                return "C101";
            else
            {
                int id=Integer.parseInt(cid.substring(1));
                return "C"+(id+1);
            }
    }
    public static String getUserNameById(String uid)throws SQLException
    {
        ps1.setString(1, uid);
        ResultSet rs=ps1.executeQuery();
        if(rs.next())
        {
            return rs.getString(1);
        }
        else
            return null;
    }
    public static ArrayList<String> getCity()throws SQLException
    {
        ArrayList<String> cityList=new ArrayList<>();
        ResultSet rs=ps2.executeQuery();
        while(rs.next())
        {
            cityList.add(rs.getString(1));
        }
        return cityList;
    }
    public static boolean addCandidate(CandidateDTO obj)throws SQLException
    {
        ps3.setString(1, obj.getCandidateId());
        ps3.setString(2, obj.getParty());
        ps3.setString(3, obj.getUserid());
        ps3.setBinaryStream(4, obj.getSymbol());
        ps3.setString(5, obj.getCity());
        return ps3.executeUpdate()!=0;
        
    }
    public static ArrayList<String> getCandidateId()throws SQLException
    {
        ArrayList<String> candidateList=new ArrayList<>();
        ResultSet rs=st.executeQuery("Select candidate_id from candidate");
        while(rs.next())
        {
            candidateList.add(rs.getString(1));
        }
        return candidateList;
    }
    public static CandidateDetails getDetailsById(String cid)throws Exception
    {
        ps4.setString(1, cid);
        ResultSet rs=ps4.executeQuery();
        CandidateDetails candidate=new CandidateDetails();
        Blob blob ;
        InputStream inputStream;
        ByteArrayOutputStream outputStream;
        byte[] buffer;
        int bytesRead;
        byte[] imageBytes;
        String base64Image;
        if(rs.next())
        {
            blob=rs.getBlob(4);
            inputStream = blob.getBinaryStream();
            outputStream = new ByteArrayOutputStream();
            buffer = new byte[4096];
            bytesRead = -1;
            while((bytesRead = inputStream.read(buffer)) != -1) 
            {
                outputStream.write(buffer, 0, bytesRead);                  
            }
            imageBytes = outputStream.toByteArray();
            Base64.Encoder en=Base64.getEncoder();
            base64Image = en.encodeToString(imageBytes);
            candidate.setSymbol(base64Image);
            candidate.setCandidateId(cid);
            candidate.setCandidateName(getUserNameById(rs.getString(3)));
            candidate.setParty(rs.getString(2));
            candidate.setUserId(rs.getString(3));
            candidate.setCity(rs.getString(5));
        }
        return candidate;
    }
    public static String getUidByCid(String cid)throws SQLException
    {
        ps5.setString(1, cid);
        ResultSet rs=ps5.executeQuery();
        if(rs.next())
        {
            return rs.getString(1);
        }
        else
            return null;
    }
    public static boolean updateCandidate(UpdateCandidateDTO obj)throws SQLException
    {
        ps6.setString(1, obj.getCity());
        ps6.setString(2, obj.getParty());
        ps6.setBinaryStream(3, obj.getSymbol());
        ps6.setString(4, obj.getCid());
        return ps6.executeUpdate()!=0;
    }
    public static boolean deleteCandidate(String cid)throws SQLException
    {
        ps7.setString(1, cid);
        return ps7.executeUpdate()!=0;
    }
    
    public static ArrayList<CandidateInfo> viewCandidate(String userId)throws SQLException, IOException
    {
        ArrayList<CandidateInfo> candidateList=new ArrayList<>();
        ps8.setString(1, userId);
        ResultSet rs=ps8.executeQuery();
        Blob blob ;
        InputStream inputStream;
        ByteArrayOutputStream outputStream;
        byte[] buffer;
        int bytesRead;
        byte[] imageBytes;
        String base64Image;
        while(rs.next())
        {
            blob=rs.getBlob(4);
            inputStream = blob.getBinaryStream();
            outputStream = new ByteArrayOutputStream();
            buffer = new byte[4096];
            bytesRead = -1;
            while ((bytesRead = inputStream.read(buffer)) != -1)
            {
                outputStream.write(buffer, 0, bytesRead);                  
            }
            imageBytes = outputStream.toByteArray();
            base64Image = Base64.getEncoder().encodeToString(imageBytes);
            CandidateInfo candidate=new CandidateInfo();
            candidate.setCandidateId(rs.getString(1));
            candidate.setCandidateName(rs.getString(2));
            candidate.setParty(rs.getString(3));
            candidate.setSymbol(base64Image);

            candidateList.add(candidate);
            System.out.println("CandidateDetails: "+candidate);
        }
        return candidateList;
    }
}


