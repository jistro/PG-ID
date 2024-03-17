// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
import {IEAS} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {Attestation} from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";
import {IRegisterSystem} from "./IRegisterSystem.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract RetroResolver is SchemaResolver {
    struct RetroAttestation {
        string impactAction;
        uint256 impactValue;
    }
    mapping(address => uint256) public retroAttestations;
    IRegisterSystem private registrySystem;
    address private immutable _owner;
    constructor(IEAS eas, IRegisterSystem _registrySystem) SchemaResolver(eas) {
        registrySystem = _registrySystem;
        _owner = msg.sender;
    }

    function changeRegistrySystem(IRegisterSystem _registrySystem) public {
        require(
            msg.sender == _owner,
            "Only owner can change the registry system"
        );
        registrySystem = _registrySystem;
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal override returns (bool) {
        RetroAttestation memory attestationData = abi.decode(
            attestation.data,
            (RetroAttestation)
        );
        registrySystem.setPointsData(
            attestationData.impactValue,
            attestation.recipient
        );
        return true;
    }

    function onRevoke(
        Attestation calldata /*attestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        return true;
    }
}
