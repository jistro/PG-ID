// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TetherUSD is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("Tether USD", "USDT")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 234 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function decimals() public view override returns (uint8) {
        return 6;
    }
}