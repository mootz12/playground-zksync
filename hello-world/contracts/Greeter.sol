//SPDX-License-Identifier: AGLP-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

// Greeter was deployed to 0xa3B1A0b739811C14c856D4c42Eda9e40B64A7140

contract Greeter is Ownable {
    string private greeting;

    event GreetUpdate(string oldGreeting, string newGreeting);

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public onlyOwner {
        emit GreetUpdate(greeting, _greeting);
        greeting = _greeting;
    }
}