// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TranscriptContract {
    struct Transcript {
        string studentName;
        string dateOfBirth;
        string studentID;
        string transcriptDetails;
        uint256 timestamp;
        bool isValid;
    }

    mapping(bytes32 => Transcript) private transcripts;
    
    event TranscriptIssued(bytes32 indexed transcriptId, string studentName, uint256 timestamp);
    event TranscriptVerified(bytes32 indexed transcriptId, address verifier);

    constructor() {
        // Empty constructor
    }

    function issueTranscript(
        string memory studentName,
        string memory dateOfBirth,
        string memory studentID,
        string memory transcriptDetails

    ) public returns (bytes32) {


        // Generate a unique transcript ID using keccak256
        bytes32 transcriptId = keccak256(
            abi.encodePacked(
                studentName,
                dateOfBirth,
                studentID,
                transcriptDetails,
                block.timestamp
            )
        );

        // Ensure transcript ID doesn't already exist
        require(!transcripts[transcriptId].isValid, "Transcript already exists");

        // Store the transcript
        transcripts[transcriptId] = Transcript({
            studentName: studentName,
            dateOfBirth: dateOfBirth,
            studentID: studentID,
            transcriptDetails: transcriptDetails,
            timestamp: block.timestamp,
            isValid: true
        });

        emit TranscriptIssued(transcriptId, studentName, block.timestamp);
        return transcriptId;
    }

    function getTranscript(bytes32 transcriptId) 
        public 
        view 
        returns (
            string memory studentName,
            string memory dateOfBirth,
            string memory studentID,
            string memory transcriptDetails,
            uint256 timestamp,
            bool isValid
        ) 
    {
        require(transcripts[transcriptId].isValid, "Transcript does not exist");
        
        Transcript memory transcript = transcripts[transcriptId];
        return (
            transcript.studentName,
            transcript.dateOfBirth,
            transcript.studentID,
            transcript.transcriptDetails,
            transcript.timestamp,
            transcript.isValid
        );
    }
}