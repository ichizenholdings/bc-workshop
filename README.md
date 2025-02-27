# ブロックチェーン技術講座ワークショップ②

このリポジトリは、ブロックチェーン技術講座ワークショップ②で使用するGithubRepositoryです。

## 概要

このワークショップでは以下の内容を学びます：

1. **Wallet アプリケーションの開発**

- BIP39 のフレーズから秘密鍵・アドレスを生成
- ウォレットからトランザクションを送信
- トランザクションの結果を確認

2. **NFT、及び NFT マーケットプレイスコントラクトの開発**

- ERC721 を用いたトークンの実装
- NFT の表示とマーケット機能の実装

3. **マーケットプレイスUIの開発**

- マーケットプレイスのUIの実装
- walletの接続
- [Web3.js](https://web3js.readthedocs.io/)を使用したブロックチェーン連携

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

- [Go](https://go.dev/doc/install)
- [Git](https://git-scm.com/downloads/win)
- [deno](https://deno.land/)
- [Node.js](https://nodejs.org/) (v22 以上)
- [Rabby Wallet](https://rabby.io/)
- [Visual Studio Code](https://code.visualstudio.com/) + [Solidity 拡張機能](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [Remix IDE](https://remix.ethereum.org/)

### 各種ツールのインストール

- Go のインストール

```shell
winget install --id GoLang.Go -e
```

- Git のインストール

```shell
winget install --id Git.Git -e --source winget
```

- Deno のインストール

```shell
irm https://deno.land/install.ps1 | iex
```

- Node.js のインストール

```shell
winget install OpenJS.NodeJS.LTS
```

- [VsCode](https://code.visualstudio.com/docs/setup/windows#_install-vs-code-on-windows)のインストール

### セットアップ手順

1. **リポジトリのクローン**

```shell
git clone <repository-url>
cd bc-workshop
```

2. submodule の初期化

```shell
git submodule update --init --recursive
```

## 参考リソース

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Web3.js ドキュメント](https://web3js.readthedocs.io/)
- [MetaMask ドキュメント](https://docs.metamask.io/)
- [IPFS ドキュメント](https://docs.ipfs.io/)
