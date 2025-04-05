// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./TokenBase.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/extension/soulbound/RMRKSoulbound.sol";
import "@rmrk-team/evm-contracts/contracts/implementations/utils/RMRKTokenURIPerToken.sol";

contract PetRecordSystem is TokenBase, RMRKNestable, RMRKSoulbound, RMRKTokenURIPerToken {

	enum Record {
		CheckUps,
		Surgery,
		Vaccination,
		Grooming,
		Deworming
	}

	struct PetRecord {
		uint256 tokenId;
		Record recordType;
        string tokenUri;

	}
	
	struct Provider {
		uint256 petId;
		bool hasAccess;
		string name;
	}

    error NotAPetOwner();
    error SenderIsNotAProvider();
    
    mapping (address => Provider) private _providers;
    mapping(uint256 => PetRecord[]) private _childRecords;

    event ServiceProviderRegistered(address indexed provider, string name, uint256 petId);
    event ServiceProviderRemoved(address indexed provider, uint256 timestamp);
    event ChildRecordAdded(uint256 indexed parentTokenId, uint256 indexed childTokenId, Record recordType, address provider);
    event PetOwnershipTransferred(uint256 indexed petId, address indexed from, address indexed to);
    event PetTokenBurned(uint256 indexed tokenId, address indexed owner);


	constructor(
        string memory name,
        string memory symbol
    ) TokenBase(name, symbol) {
		_transferOwnership(msg.sender);
	} 

	function registerServiceProvider(address provider, string memory name, uint256 petId) public {
		_providers[provider] = Provider({
			petId: petId,
			hasAccess: true,
			name: name
		});
        emit ServiceProviderRegistered(provider, name, petId);
    }
    
    function removeServiceProvider(address provider, uint256 petId) public {
		require(_providers[provider].petId == petId, "Provider not assigned to this pet");

		_providers[provider].hasAccess = false;
        emit ServiceProviderRemoved(provider, block.timestamp);
    }
    
    function isServiceProvider(address provider, uint256 petId) public view returns (bool) {
        return _providers[provider].petId == petId && _providers[provider].hasAccess;
    }
    
    function getProviderName(address provider, uint256 petId) public view returns (string memory) {
		require(_providers[provider].petId == petId, "Provider not assigned to this pet");
        return _providers[provider].name;
    }

	function mintPet(
		address to,
		string memory parentTokenUri
	) external returns (uint256 tokenId) {
		(tokenId, ) = _prepareMint(1);

		_setTokenURI(tokenId, parentTokenUri);
		_safeMint(to, tokenId, "");
        registerServiceProvider(msg.sender, "owner", tokenId);
	}

	function addPetRecord(
		address to, 
		uint256 
		parentTokenId, 
		Record recordType, 
		string memory childTokenUri
	) external returns (uint256 tokenId) {
        if (ownerOf(parentTokenId) != to) revert NotAPetOwner();
        if (!_providers[msg.sender].hasAccess) revert SenderIsNotAProvider();

        (tokenId, ) = _prepareMint(1);
        _setTokenURI(tokenId, childTokenUri);
        _nestMint(address(this), tokenId, parentTokenId, "");
        _acceptChild(parentTokenId, 0, address(this), tokenId);

        _childRecords[parentTokenId].push(PetRecord({
            tokenId: tokenId,
            recordType: recordType,
            tokenUri: childTokenUri
        }));

        emit ChildRecordAdded(parentTokenId, tokenId, recordType, msg.sender);
    }

	function getPetRecords(uint256 parentTokenId) public view returns (PetRecord[] memory records) {
		return _childRecords[parentTokenId];
    }

    function burnPet(uint256 parentTokenId,  PetRecord[] memory petRecords) internal {
        require(ownerOf(parentTokenId) == msg.sender, "Not token owner");

        // Burn the token
        burn(parentTokenId);

        for (uint256 i = 0; i < petRecords.length; i++) {
            uint256 childTokenId = petRecords[i].tokenId;
            burn(childTokenId);
            emit PetTokenBurned(childTokenId, msg.sender);
        }

        emit PetTokenBurned(parentTokenId, msg.sender);
    }

	function transferPetOwnership(
		address to, 
		uint256 petTokenId
	) external {
		safeTransferFrom(msg.sender, to, petTokenId);
        emit PetOwnershipTransferred(petTokenId, msg.sender, to);
    }

	function isTransferable(
        uint256 tokenId,
        address from,
        address to
    ) public view virtual override returns (bool) {
        return from == address(0) || to != address(0) && msg.sender == ownerOf(tokenId);
    }

	function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(RMRKSoulbound, RMRKNestable) {
        if (!isTransferable(tokenId, from, to))
            revert RMRKCannotTransferSoulbound();
    }

	function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(RMRKSoulbound, RMRKNestable) returns (bool) {
        return
            RMRKNestable.supportsInterface(interfaceId) ||
            RMRKSoulbound.supportsInterface(interfaceId);
    }
}