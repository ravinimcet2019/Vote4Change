/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.UserDTO;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author dell
 */
public class UserDAO {
    private static PreparedStatement ps,ps1;
    static
    {
        try
        {
            ps=DBConnection.getConnection().prepareStatement("Select user_type from user_details where adhar_no=? and password=?");
            ps1=DBConnection.getConnection().prepareStatement("Delete from user_details where ADHAR_NO=?");
        }
        catch(SQLException ex)
        {
            ex.printStackTrace();
        }
    }
    public static String validateUser(UserDTO user)throws SQLException
    {
        ps.setString(1, user.getUserid());
        ps.setString(2, user.getPassword());
        ResultSet rs=ps.executeQuery();
        if(rs.next())
            return rs.getString(1);
        return null;
    }
    public static boolean deleteUser(String cid)throws SQLException
    {
        ps1.setString(1, cid);
        return ps1.executeUpdate()!=0;
    }
}
