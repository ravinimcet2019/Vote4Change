/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dto;

/**
 *
 * @author dell
 */
public class VoteDTO {
    private String candidateId;
    private String VoterId;

    public VoteDTO(String candidateId, String VoterId) {
        this.candidateId = candidateId;
        this.VoterId = VoterId;
    }

    public VoteDTO() {
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getVoterId() {
        return VoterId;
    }

    public void setVoterId(String VoterId) {
        this.VoterId = VoterId;
    }
    
}
