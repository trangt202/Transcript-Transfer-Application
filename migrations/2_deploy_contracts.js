var TranscriptContract = artifacts.require("./TranscriptContract.sol");

module.exports = function (deployer) {
	deployer.deploy(TranscriptContract, {
	gas: 6000000
	});
	
};
