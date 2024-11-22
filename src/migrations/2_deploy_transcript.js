const TranscriptContract = artifacts.require("TranscriptContract");

module.exports = function(deployer) {
  deployer.deploy(TranscriptContract);
};