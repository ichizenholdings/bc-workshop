# NFT Market

基本的にブラウザ上のRemix IDEと接続しながら開発を進めていく

## 開発環境

- Node.js v23以上
- remixd
- ブラウザ上のRemix IDE

## 事前準備

Node.jsのインストール

```shell
winget install OpenJS.NodeJS.LTS
```

もしくは[公式のインストーラ](https://nodejs.org/en)から


インストールできたか確認

```shell
node -V
v22.14.0
```


remixdのインストール

```bash
npm install @remix-project/remixd -g
```


## Remix IDEとの接続

```bash
cd nft-market
remixd -s . --remix-ide https://remix.ethereum.org
```
