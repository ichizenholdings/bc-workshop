// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyToken is ERC721Enumerable {
  string public baseURI;

  constructor(string memory baseURI_) ERC721("MyToken", "MTK") {
    // ERC721がbaseURIを元にトークン毎のmetadataを返すためconstructorでbaseURIを設定する
    baseURI = baseURI_;
  }

  function mint(address to, uint256 tokenId) public {
    _mint(to, tokenId);
  }

  /**
   * @notice ERC721ではdefaultでは空文字を返すためoverride
   */
  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  /**
   * @notice ERC721の規格でtokenのメタデータが設定されているurlを返す
   * 各Marketplaceでtokenのmetadataを取得するために使用される
   */
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    return super.tokenURI(tokenId);
  }
}
