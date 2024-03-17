// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IRegisterSystem {
    function safeMint() external;

    function registerUsername(string memory _username) external;

    function setPointsData(uint256 _points, address _user) external;

    function customProfileData(uint256 _part, uint256 _mod) external;

    function getLevelOfUser(address _user) external view returns (uint256);

    function getPointsOfUser(address _user) external view returns (uint256);

    function getUserData(
        address _user
    ) external view returns (uint256 timeStamp, uint256 points, uint256 level);

    function setAdmin(address _admin) external;

    function setAttester(address _attester) external;

    function removeAdmin(address _admin) external;

    function removeAttester(address _attester) external;

    function getUsername(
        address _account
    ) external view returns (string memory);
}
