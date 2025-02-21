# NFT Marketplace Client

シンプルで使いやすい NFT マーケットプレイスのフロントエンド実装です。

## 機能概要

- **NFT ギャラリー表示**

  - 全 NFT の一覧表示
  - 所有者情報の表示
  - IPFS メタデータの取得と表示

- **ウォレット連携**

  - MetaMask/Rabby Wallet 接続
  - アドレス表示（Blockies アイコン付き）
  - ETH 残高の表示
  - ネットワーク情報の表示
  - アカウント切り替え検知
  - ネットワーク切り替え検知

- **NFT 取引機能**
  - NFT の出品（価格設定）
  - 出品中の NFT の購入
  - 所有 NFT の管理
  - 非同期トランザクション処理
  - エラーハンドリング

## 技術スタック

- **フロントエンド**

  - Web3.js: イーサリアムブロックチェーンとの対話
  - EIP-1193: 標準ウォレット接続プロトコル
  - Ethereum Blockies: ウォレットアドレスのアイコン生成

- **スタイリング**

  - CSS Variables: テーマカラーの一元管理
  - レスポンシブデザイン
  - モジュラー CSS 設計

- **アーキテクチャ**
  - モジュラーコンポーネント設計
  - サービスクラスによるビジネスロジックの分離
  - 非同期処理の適切な分離

## 対応ネットワーク

- Ethereum Mainnet
- Goerli Testnet
- Sepolia Testnet
- Polygon Mainnet
- Mumbai Testnet

## プロジェクト構造

```
market-client/
├── js/
│   ├── nft-service.js      # NFTコントラクト連携
│   ├── marketplace-service.js  # マーケットプレイス連携
│   └── ui-manager.js       # UI管理
├── styles/
│   ├── base.css           # 基本スタイル
│   ├── layout.css         # レイアウト
│   └── components/        # コンポーネント別スタイル
│       ├── nft-card.css
│       └── wallet.css
├── index.html             # NFTギャラリーページ
└── my-nfts.html          # マイNFTページ
```

## セットアップ

1. 必要な環境

   - MetaMask
   - モダンな Web ブラウザ
   - ローカルサーバー（Live Server など）

2. インストール

   ```bash
   git clone <repository-url>
   cd market-client
   ```

3. 設定

   - `js/nft-service.js`で NFT コントラクトアドレスを設定
   - `js/marketplace-service.js`でマーケットプレイスアドレスを設定

4. 起動
   - Live Server などで HTTP サーバーを起動
   - `index.html`にアクセス

## 使用方法

1. **NFT ギャラリーの閲覧**

   - `index.html`にアクセス
   - 全ての NFT とその所有者を確認
   - 購入可能な NFT に対して購入操作

2. **マイ NFT の管理**
   - `my-nfts.html`にアクセス
   - MetaMask でウォレット接続
   - 所有 NFT の確認と出品操作

## 開発ガイドライン

- コンポーネントは再利用可能な形で実装
- CSS はモジュール単位で管理
- Web3 関連の処理は専用サービスクラスに集約
