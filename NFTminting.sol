//SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTminting is ERC721URIStorage,Ownable{

    uint totalNFT;
    uint maxNFT;

    constructor() ERC721("jbworks","JBW") { 
        maxNFT = 100;
    }

    function mintNFT(string memory tokenURI) public returns (uint256){
        require(maxNFT > totalNFT, "Minting Limit exhausted");
        totalNFT++;
        uint256 tokenID = totalNFT;
        _mint(msg.sender, tokenID);
        _setTokenURI(tokenID, tokenURI);
        return tokenID;
    }

    function addSupply(uint _maxNFT) public onlyOwner {
        maxNFT += _maxNFT;
    }

    function gettotalNFT() public view returns (uint) {
        return totalNFT;
    }

    function getmaxNFT() public view returns (uint) {
        return maxNFT;
    }
}
