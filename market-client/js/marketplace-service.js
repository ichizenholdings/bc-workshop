import { NFT_CONFIG, NFT_ABI } from './nft-service.js'

// マーケットプレイスの設定
const MARKETPLACE_CONFIG = {
  CONTRACT_ADDRESS: '0xcd98cdfaa24a08146d88414c78ba0bebf41dc5d5', // デプロイ後のアドレスを設定
}

// マーケットプレイスのABI
const MARKETPLACE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'MarketItemCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
    ],
    name: 'buyItem',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'listItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

class MarketplaceService {
  constructor(web3) {
    if (!web3) {
      throw new Error('MarketplaceService: web3インスタンスが必要です')
    }
    this.web3 = web3
    this.contract = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_CONFIG.CONTRACT_ADDRESS
    )
  }

  async getMarketItem(itemId) {
    return this.contract.methods.idToMarketItem(itemId).call()
  }

  async listNFT(tokenId, priceWei) {
    const accounts = await this.web3.eth.getAccounts()
    if (!accounts[0]) throw new Error('No wallet connected')

    // まずNFTコントラクトのapproveを呼び出し
    await this.approveNFT(tokenId)

    // その後、マーケットプレイスのlistItemを呼び出し
    return this.contract.methods
      .listItem(NFT_CONFIG.CONTRACT_ADDRESS, tokenId, priceWei)
      .send({ from: accounts[0] })
  }

  async approveNFT(tokenId) {
    const accounts = await this.web3.eth.getAccounts()
    const nftContract = new this.web3.eth.Contract(
      NFT_ABI,
      NFT_CONFIG.CONTRACT_ADDRESS
    )

    return nftContract.methods
      .approve(MARKETPLACE_CONFIG.CONTRACT_ADDRESS, tokenId)
      .send({ from: accounts[0] })
  }

  async buyNFT(itemId, price) {
    const accounts = await this.web3.eth.getAccounts()
    if (!accounts[0]) throw new Error('No wallet connected')

    return this.contract.methods.buyItem(itemId).send({
      from: accounts[0],
      value: price, // 購入価格をwei単位で送信
    })
  }
}

export { MarketplaceService }
