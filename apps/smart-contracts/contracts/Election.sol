// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Registry {
    struct Voter {
        address voter;
        string fullName;
        bool verified;
        // We can store in registered date, but let's not complicate things now shall we
    }

    mapping(address => Voter) public voters;

    // in an ideal world, only certain people can make a registered voter, but let's not complicate things now shall we
    function registerVoter(string memory fullName) external {
        require(voters[msg.sender].verified == false, "You are already a registered voter.");

        voters[msg.sender].fullName = fullName;
        voters[msg.sender].verified = true;
    }

    function isVoterVerified(address voter) external view returns (bool) {
        return voters[voter].verified;
    }
}

contract Ballot {
    struct Voter {
        address voter;
        bool voted;
        uint vote;
    }

    mapping(address => Voter) public voters;

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    Registry private registry;
    bool isElectionOnGoing;

    address owner;

    constructor(address registryAddress, string[] memory candidateNames) {
        owner = msg.sender;
        registry = Registry(registryAddress);

        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function setElectionStatus(bool status) public {
        require(owner == msg.sender, "You are not authorized to access this function.");
        isElectionOnGoing = status;
    }

    function vote(uint candidate) external {
        require(isElectionOnGoing == true, "This election is not on going.");
        require(registry.isVoterVerified(msg.sender) == true, "You are not a verified voter.");
        require(voters[msg.sender].voted == false, "You have already voted.");
        require(candidate >= 0 && candidate < candidates.length, "Candidate does not exist.");

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = candidate;
        candidates[candidate].voteCount++;
    }

    function getStatistic() external view returns (Candidate[] memory) {
        return candidates;
    }
} 