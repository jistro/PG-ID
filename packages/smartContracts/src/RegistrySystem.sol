// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RegistrySystem is ERC721, Ownable {

    string constant PGID = ".pjid";

    struct verificationMetadata {
        uint256 timeStampBegin;
        uint256 timeStampEnd;
        bytes merkleRoot;
        uint256 level;
    }

    mapping (address account => string username) public usernameRegistry;

    mapping (address user => mapping(uint256 parts => uint256 mod) )public boddyOfProfile;

    mapping ( address user => verificationMetadata ) public dataVerfificationUser;
    constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "test://pgid/";
    }

    function safeMint(
        uint256 tokenId,
        uint256 _timeStampBegin, 
        uint256 _timeStampEnd,
        bytes memory _merkleRoot,
        uint256 _level
    ) public {
        _safeMint(msg.sender, tokenId);
        dataVerfificationUser[msg.sender] = verificationMetadata({
            timeStampBegin: _timeStampBegin,
            timeStampEnd: _timeStampEnd,
            merkleRoot: _merkleRoot,
            level: _level
        });
        
    }

    function registerUsername(string memory _username) public {
        usernameRegistry[msg.sender] = string.concat(_username, PGID);
    }

    function setPointsData(
        uint256 _timeStampBegin, 
        uint256 _timeStampEnd,
        bytes memory _merkleRoot,
        uint256 _level
    ) external returns (bool success) {
            //if _merkleRoot and dataVerfificationUser.merkleRoot is diferent return a false
            if (keccak256(_merkleRoot) != keccak256(dataVerfificationUser[msg.sender].merkleRoot)) {
                dataVerfificationUser[msg.sender].merkleRoot = "";
                return false;
            }
        dataVerfificationUser[msg.sender] = verificationMetadata({
            timeStampBegin: _timeStampBegin,
            timeStampEnd: _timeStampEnd,
            merkleRoot: _merkleRoot,
            level: _level
        });

        return true;
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

    function getUsername(address _account) public view returns (string memory) {
        return usernameRegistry[_account];
    }
}
