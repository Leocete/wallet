// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Wallet {
    address[] public approvers;
    uint256 public quorum;
    struct Transfer {
        uint256 id;
        uint256 amount;
        address payable to;
        uint256 approvals;
        bool sent;
    }
    Transfer[] public transfers;
    mapping(address => mapping(uint256 => bool)) public approvals;

    constructor(address[] memory _approvers, uint256 _quorum) {
        approvers = _approvers;
        quorum = _quorum;
    }

    function getApprovers() external view returns (address[] memory) {
        return approvers;
    }

    function getTransfers() external view returns (Transfer[] memory) {
        return transfers;
    }

    function createTransfer(uint256 _amount, address payable _to)
        external
        onlyApprover
    {
        transfers.push(
            Transfer({
                id: transfers.length,
                amount: _amount,
                to: _to,
                approvals: 0,
                sent: false
            })
        );
    }

    function approveTransfer(uint256 id) external onlyApprover {
        require(transfers[id].sent == false, "Transfer has already been sent.");
        require(
            approvals[msg.sender][id] == false,
            "Cannot approve the transfer twice."
        );

        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        if (transfers[id].approvals >= quorum) {
            transfers[id].sent = true;

            address payable to = transfers[id].to;
            uint256 amount = transfers[id].amount;

            to.transfer(amount);
        }
    }

    modifier onlyApprover() {
        bool allowed = false;

        for (uint256 i = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                allowed = true;
            }
        }

        require(allowed == true, "Only approvers allowed.");
        _;
    }

    receive() external payable {}
}
