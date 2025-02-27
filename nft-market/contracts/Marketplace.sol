// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IMarketplace.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace is IMarketplace {
  uint256 public itemCount;

  struct MarketItem {
    uint256 itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) public idToMarketItem;

  event MarketItemCreated(
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    uint256 price
  );

  event MarketItemSold(
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address buyer,
    uint256 price
  );

  /// @notice NFTを出品する。出品時にNFTの所有者からマーケットコントラクトへNFTを移転する。
  /// @param nftContract NFTコントラクトのアドレス
  /// @param tokenId 出品するNFTのトークンID
  /// @param price 販売価格（wei単位）
  function listItem(address nftContract, uint256 tokenId, uint256 price) external override {
    require(price > 0, "Price must be greater than zero");

    // NFTの所有者であることを確認
    require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");

    // マーケットプレイスがNFTを移転する権限があるか確認
    require(
      IERC721(nftContract).getApproved(tokenId) == address(this) ||
        IERC721(nftContract).isApprovedForAll(msg.sender, address(this)),
      "Marketplace not approved to transfer this NFT"
    );

    itemCount++;

    // 出品者からマーケットプレイスにNFTを移転
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    idToMarketItem[itemCount] = MarketItem(
      itemCount,
      nftContract,
      tokenId,
      payable(msg.sender),
      price,
      false
    );

    emit MarketItemCreated(itemCount, nftContract, tokenId, msg.sender, price);
  }

  /// @notice 出品されたNFTを購入する。送金額が出品価格以上である必要がある。
  /// @param itemId 購入対象のアイテムID
  function buyItem(uint256 itemId) external payable override {
    MarketItem storage item = idToMarketItem[itemId];
    require(item.itemId != 0, "Item does not exist");
    require(!item.sold, "Item already sold");
    require(msg.value >= item.price, "Insufficient funds sent");

    item.sold = true;

    // NFTをマーケットプレイスから購入者へ移転
    IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);

    // 売上金を出品者へ送金
    item.seller.transfer(item.price);

    // もし送金額が価格を上回っていた場合、超過分を返金
    if (msg.value > item.price) {
      payable(msg.sender).transfer(msg.value - item.price);
    }

    emit MarketItemSold(
      item.itemId,
      item.nftContract,
      item.tokenId,
      item.seller,
      msg.sender,
      item.price
    );
  }
}
