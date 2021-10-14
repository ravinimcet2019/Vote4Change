/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dao;

import evoting.dto.CandidateInfo;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author dell
 */
public class check {
    public static void main(String[] args) {
        try
    {
    ArrayList<CandidateInfo> c=CandidateDAO.viewCandidate("0000");
        System.out.println(c);
    }
    catch(Exception ex)
    {
        
    }
    }
    
}
