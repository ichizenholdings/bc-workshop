# NFT マーケットプレイス開発ワークショップ

このリポジトリは、ブロックチェーン技術講座のワークショップ②で使用する NFT マーケットプレイスの開発環境です。ERC721 トークンの作成、表示、取引機能を実装したシンプルな dApp を構築します。

## 概要

このワークショップでは以下の内容を学びます：

1. **スマートコントラクト開発**

   - ERC721 トークン（NFT）の実装
   - マーケットプレイスコントラクトの実装
   - Solidity の基本的なパターンと設計

2. **フロントエンド開発**
   - Web3.js を使用したブロックチェーン連携
   - ウォレット接続（MetaMask/Rabby）
   - NFT の表示と取引 UI の実装

## リポジトリ構成

```
/
├── deno-eth-wallet/      # ウォレットアプリケーション
|
├── market-client/         # フロントエンドアプリケーション
│   ├── js/                # JavaScript モジュール
│   │   ├── nft-service.js         # NFT コントラクト連携
│   │   ├── marketplace-service.js  # マーケットプレイス連携
│   │   ├── wallet-service.js      # ウォレット連携
│   │   └── ui-manager.js          # UI 管理
│   ├── styles/            # CSS スタイル
│   ├── index.html         # NFT ギャラリーページ
│   └── my-nfts.html       # マイ NFT 管理ページ
│
└── nft-market/            # スマートコントラクト
    ├── contracts/         # Solidity コントラクト
    │   ├── MyToken.sol           # ERC721 トークン実装
    │   ├── Marketplace.sol       # マーケットプレイス実装
    │   └── IMarketplace.sol      # インターフェース定義
    └── artifacts/         # コンパイル済みコントラクト
```

## 開発環境のセットアップ

### 必要なツール

- [deno](https://deno.land/)
- [Node.js](https://nodejs.org/) (v22 以上)
- [Rabby Wallet](https://rabby.io/)
- [Visual Studio Code](https://code.visualstudio.com/) + [Solidity 拡張機能](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [Remix IDE](https://remix.ethereum.org/)

### セットアップ手順

1. **リポジトリのクローン**

   ```bash
   git clone <repository-url>
   cd nft-marketplace-workshop
   ```

2. **フロントエンドの設定**

   ```bash
   cd market-client
   # Live Server などの HTTP サーバーで実行
   ```

3. **コントラクトのデプロイ**

   - Remix IDE または Hardhat を使用してコントラクトをデプロイ
   - デプロイしたコントラクトアドレスを `market-client/js/nft-service.js` と `market-client/js/marketplace-service.js` に設定

## ワークショップの進め方

### ステップ 1: スマートコントラクトの理解

1. `MyToken.sol` - ERC721 トークンの実装を確認
2. `IMarketplace.sol` - マーケットプレイスのインターフェースを確認
3. `Marketplace.sol` - マーケットプレイスの実装を確認

### ステップ 2: コントラクトのデプロイ

1. Sepolia テストネットにコントラクトをデプロイ
2. フロントエンドの設定ファイルにコントラクトアドレスを設定

### ステップ 3: フロントエンドの実装

1. ウォレット接続機能の確認
2. NFT 表示機能の確認
3. NFT 取引機能の確認

### ステップ 4: 機能拡張（オプション）

1. NFT メタデータの拡張
2. 検索・フィルタリング機能の追加
3. オークション機能の実装

## 参考リソース

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Web3.js ドキュメント](https://web3js.readthedocs.io/)
- [MetaMask ドキュメント](https://docs.metamask.io/)
- [IPFS ドキュメント](https://docs.ipfs.io/)
