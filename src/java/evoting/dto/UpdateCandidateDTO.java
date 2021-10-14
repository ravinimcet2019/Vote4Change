/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dto;

import java.io.InputStream;

/**
 *
 * @author dell
 */
public class UpdateCandidateDTO {
     private String cid;
     private String party;
     private String city;
     private InputStream symbol;

    public UpdateCandidateDTO() {
    }

    public UpdateCandidateDTO(String cid, String party, String city, InputStream symbol) {
        this.cid = cid;
        this.party = party;
        this.city = city;
        this.symbol = symbol;
    }

    

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }

    public InputStream getSymbol() {
        return symbol;
    }

    public void setSymbol(InputStream symbol) {
        this.symbol = symbol;
    }

    
     
}
