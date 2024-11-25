// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TranscriptContract {
    struct Transcript {
        string cid;
        address owner;
    }

    mapping(uint256 => Transcript) private transcripts;
    
    uint256 public transcriptCount;
    
    event TranscriptIssued(uint256 indexed transcriptId, string cid, address owner);
    event TranscriptVerified(uint256 indexed transcriptId, address verifier);

    constructor() {
        // Empty constructor
    }

    function issueTranscript(string memory cid) public {
    
        // Store the transcript
        transcripts[transcriptCount] = Transcript({
            cid: cid,
            owner: msg.sender
        });

        emit TranscriptIssued(transcriptCount, cid, msg.sender);
        transcriptCount++;
    }

    function getTranscript(uint256 transcriptId) public view returns (string memory) 
    {
        require(transcripts[transcriptId].owner == msg.sender, "Not authorized");
        
        return transcripts[transcriptId].cid;
    }
}