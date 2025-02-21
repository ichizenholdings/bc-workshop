// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMarketplace {
    /// @notice NFTの出品を行う
    /// @param nftContract NFTコントラクトのアドレス
    /// @param tokenId NFTのトークンID
    /// @param price 販売価格（wei単位）
    function listItem(address nftContract, uint256 tokenId, uint256 price) external;

    /// @notice 出品されたNFTの購入を行う
    /// @param itemId 出品アイテムのID
    function buyItem(uint256 itemId) external payable;
}