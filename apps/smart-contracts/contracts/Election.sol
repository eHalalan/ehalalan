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
    }

    mapping(address => Voter) public voters;

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public presidents;
    Candidate[] public vicePresidents;
    Candidate[] public senators;
    Registry private registry;
    bool isElectionOnGoing;

    address owner;

    constructor(address registryAddress, string[] memory presidentNames, string[] memory vicePresidentNames, string[] memory senatorNames) {
        owner = msg.sender;
        registry = Registry(registryAddress);

        for (uint i = 0; i < presidentNames.length; i++) {
            presidents.push(Candidate({
                name: presidentNames[i],
                voteCount: 0
            }));
        }
        for (uint i = 0; i < vicePresidentNames.length; i++) {
            vicePresidents.push(Candidate({
                name: vicePresidentNames[i],
                voteCount: 0
            }));
        }
        for (uint i = 0; i < senatorNames.length; i++) {
            senators.push(Candidate({
                name: senatorNames[i],
                voteCount: 0
            }));
        }
    }

    function setElectionStatus(bool status) public {
        require(owner == msg.sender, "You are not authorized to access this function.");
        isElectionOnGoing = status;
    }

    function vote(int presidentVote, int vicePresidentVote, int[] memory senatorVotes) external {
        require(isElectionOnGoing, "This election is not on going.");
        require(registry.isVoterVerified(msg.sender), "You are not a verified voter.");
        require(voters[msg.sender].voted == false, "You have already voted.");

        require(presidentVote < int(presidents.length), "Invalid vote for President.");
        require(vicePresidentVote < int(vicePresidents.length), "Invalid vote for Vice President.");
        require(senatorVotes.length == 12, "You have to vote 12 Senators.");

        voters[msg.sender].voted = true;
        // -1 means abstain
        if (presidentVote >= 0) {
            presidents[uint(presidentVote)].voteCount++;
        }

        if (vicePresidentVote >= 0) {
            vicePresidents[uint(vicePresidentVote)].voteCount++;
        }

        for (uint i = 0; i < senatorVotes.length; i++) {
            if (senatorVotes[i] >= 0 && senatorVotes[i] < int(senators.length)) {
                senators[uint(senatorVotes[i])].voteCount++;
            }
        }
    }

    function getStatistic() external view returns (Candidate[] memory, Candidate[] memory, Candidate[] memory) {
        return (presidents, vicePresidents, senators);
    }
} 