// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RegisterSystem is ERC721, AccessControl {

    uint256 private _nextTokenId;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ATTESTER_ROLE = keccak256("ATTESTER_ROLE");

    string constant PGID = ".pj.id";

    struct verificationMetadata {
        uint256 timeStamp;
        uint256 points;
        uint256 level;
    }

    mapping (address account => string username) public usernameRegistry;

    mapping (address user => mapping(uint256 parts => uint256 mod) )public boddyOfProfile;

    mapping ( address user => verificationMetadata ) public dataVerfificationUser;
    constructor(address admin)
        ERC721("PG ID", "PJ ID")
    {
        _grantRole(ADMIN_ROLE, admin);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://bafkreihwvwpegkg7d7ko2e4xzi4vu5vs453r7u3dz3cnkymmzpjxtjiygi.ipfs.nftstorage.link/";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        return _baseURI();
    }

    function safeMint(
    ) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        dataVerfificationUser[msg.sender] = verificationMetadata({
            timeStamp: block.timestamp,
            points: 0,
            level: 0
        });
        
    }

    function registerUsername(string memory _username) public {
        usernameRegistry[msg.sender] = string.concat(_username, PGID);
    }

    function setPointsData(
        uint256 _points,
        address _user
    ) external onlyRole(ATTESTER_ROLE){

        dataVerfificationUser[_user].points += _points;
        if (_points >10 && _points < 30) {
            dataVerfificationUser[_user].level = 1;
        } else if (_points >= 30 && _points < 75) {
            dataVerfificationUser[_user].level = 2;
        } else if (_points >= 75 && _points < 150) {
            dataVerfificationUser[_user].level = 3;
        } else if (_points >= 150 && _points < 300) {
            dataVerfificationUser[_user].level = 4;
        } else if (_points >= 300) {
            dataVerfificationUser[_user].level = 5;
        } else {
            dataVerfificationUser[_user].level = 0;
        }
    
        dataVerfificationUser[msg.sender].timeStamp = block.timestamp;
    }

    /**
     * we have 4 sections the last (3) is a hat who is 
     * the unlockable part of the profile
     */
    function customProfileData(uint256 _part, uint256 _mod) public {
        if (_part >= 4 ) {
            revert();
        }

        if (_part == 3) { //hat unlockable
            if (_mod <= dataVerfificationUser[msg.sender].level) {
                boddyOfProfile[msg.sender][_part] = _mod;
            } else {
                revert();
            }
        } else {
            boddyOfProfile[msg.sender][_part] = _mod;
        }
    }

    function getLevelOfUser(address _user) public view returns (uint256) {
        return dataVerfificationUser[_user].level;
    }

    function getPointsOfUser(address _user) public view returns (uint256) {
        return dataVerfificationUser[_user].points;
    }

    function getUserData(address _user) public view returns (verificationMetadata memory) {
        return dataVerfificationUser[_user];
    }

    function setAdmin(address _admin) public onlyRole(ADMIN_ROLE) {
        _grantRole(ADMIN_ROLE, _admin);
    }

    function setAttester(address _attester) public onlyRole(ADMIN_ROLE) {
        _grantRole(ATTESTER_ROLE, _attester);
    }

    function removeAdmin(address _admin) public onlyRole(ADMIN_ROLE) {
        _revokeRole(ADMIN_ROLE, _admin);
    }

    function removeAttester(address _attester) public onlyRole(ADMIN_ROLE) {
        _revokeRole(ATTESTER_ROLE, _attester);
    }

    function getUsername(address _account) public view returns (string memory) {
        return usernameRegistry[_account];
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
