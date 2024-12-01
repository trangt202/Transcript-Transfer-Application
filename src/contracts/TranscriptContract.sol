// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TranscriptContract {
    struct Transcript {
        string cid;
        //address owner; 
        address university; //admin/university
    }


    mapping(address => bool) public isAdmin;
    //mapping(address => bool) public isStudent;
    mapping(address => bool) public isVerifier; //other uni or employee
    
    mapping(uint256 => Transcript) private transcripts;
    
    uint256 public transcriptCount;
    
    event TranscriptIssued(uint256 indexed transcriptId, string cid, address university);
    //event TranscriptVerified(uint256 indexed transcriptId, address verifier);

    modifier onlyAdmin(){
        require(isAdmin[msg.sender], "Only admins are allowed to do this");
        _;
        

    }
    
    modifier onlyAuthorized(){
        require(isAdmin[msg.sender] || isVerifier[msg.sender], "Only admins or verifiers are allowed to do this");
        _;
    }

    
    constructor() {
        isAdmin[msg.sender] = true; //initially admin
        

    }

    function setAdmin(address user) public onlyAdmin {
        isAdmin[user] = true;
    }
    
    function setVerifier(address user) public onlyAdmin {
        isVerifier[user] = true;
    }
    
    function checkIsAdmin(address user) public view returns (bool) {
    	return isAdmin[user];
    }
    
    function checkIsVerifier(address user) public view returns (bool) {
    	return isVerifier[user];
    }
    
    

    function issueTranscript(string memory cid) public onlyAdmin {
    
        // Store the transcript
        transcripts[transcriptCount] = Transcript({
            cid: cid,
            university: msg.sender
        });

        emit TranscriptIssued(transcriptCount, cid, msg.sender);
        transcriptCount++;
    }

    function getTranscript(uint256 transcriptId) public view onlyAuthorized returns (string memory, address) {

        require(transcriptId < transcriptCount, "Transcript does not exist");
        Transcript memory tr = transcripts[transcriptId];
        return (tr.cid, tr.university);
    }
    
}