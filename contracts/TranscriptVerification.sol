// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TranscriptVerification {

    //parameters

    //roles
    mapping(address => bool) public isStudent;
    mapping(address => bool) public isUniversity;

    mapping(address => mapping(address => bool)) public authorizedEntities; //entity and whether it is authorized or not //accessed externally
    
    mapping(address => string) public studentTranscripts; //ipfs hashes and students

    //encryption handled by node.js server

    //ipfs hash: 
        //uni fills out the trascript form
        //data converted to JSON
        //JSON converted into a string
        //upload the encrypted string to the ipfs
        //store the ipfs hash using createTranscipt f-n

    //events
    event TranscriptIsCreated(address student, string ipfsHash); //called when transcript's been created

    event Authorized(address entity); //called when entity is added to the authorized list



    // modifiers
    modifier onlyAuthorizedEntity(address student) {
        require(authorizedEntities[student][msg.sender], "Entity not authorized");
        _;  // Placeholder for the function body
    }

    modifier onlyStudent() {
        require(isStudent[msg.sender], "Only students are allowed to do this");
        _;  // Placeholder for the function body
    }

    modifier onlyUniversity() {
        require(isUniversity[msg.sender], "Only universities(transcript creators) are allowed to do this");
        _;  // Placeholder for the function body
    }



    //admin f-ns
    function setStudent(address student) public { //set user address as student
        isStudent[student] = true;
    }

    function setUniversity(address university) public {
        isUniversity[university] = true;
    }

    // function setAuthEntity(address student, address entity) public {
    //     authorizedEntities[student][entity] = true;
    // }



    //functions
    function createTranscript(address student, string memory ipfsHash) public onlyUniversity { // create transcript and upload ipfs hash
        studentTranscripts[student] = ipfsHash;
        emit TranscriptIsCreated(student, ipfsHash);
    }

    function authorize(address entity) public onlyStudent {
        
        authorizedEntities[msg.sender][entity] = true;
        emit Authorized(entity);
    }

    function isAuthorized(address student, address entity) public view returns (bool){ //can't change state
        return authorizedEntities[student][entity]; //get entity to check if authorized
    }

    //use ipfs hash instead of unique id for transcript
    function verifyTranscript(address student) public view onlyAuthorizedEntity(student) returns (string memory){ //if authorized can call verify
        
        string memory transcriptHash = studentTranscripts[student];

        require(bytes(transcriptHash).length > 0, "Transcript not found"); //check if hash not empty

        return transcriptHash; //returns the hash to verify if exists
    }

    
}
