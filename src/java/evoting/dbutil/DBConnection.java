/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author dell
 */
public class DBConnection {
    private static Connection conn=null;
    static
    {
        try
        {
            Class.forName("oracle.jdbc.OracleDriver");
            conn=DriverManager.getConnection("jdbc:oracle:thin:@//DESKTOP-097RD5Q:1521/xe", "evoting", "evoting");
        }
        catch(ClassNotFoundException cnf)
        {
            cnf.printStackTrace();
        }
        catch(SQLException ex)
        {
            ex.printStackTrace();
        }
    }
    
    public static Connection getConnection()
    {
        return conn;
    }
    public static void closeConnection()
    {
        try
        {
            if(conn!=null)
                conn.close();
        }
        catch(SQLException ex)
        {
            ex.printStackTrace();
        }
    }
}
