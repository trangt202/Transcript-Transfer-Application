var Verification = artifacts.require("./TranscriptVerification.sol");

module.exports = function (deployer) {
	deployer.deploy(Verification, {
	gas: 6000000
	});
	
};
