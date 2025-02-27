// NFT関連の定数
const NFT_CONFIG = {
  CONTRACT_ADDRESS: '0xE235f5feEA49Cb9Bf25f384395B073c995d43966',
  RPC_URL: 'https://sepolia.drpc.org',
  MAX_TOKEN_ID: 9,
}

// 最小限のERC721 ABI
export const NFT_ABI = [
  {
    constant: true,
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

class NFTService {
  constructor(web3) {
    this.web3 = web3 || new Web3(NFT_CONFIG.RPC_URL)
    this.contract = new this.web3.eth.Contract(
      NFT_ABI,
      NFT_CONFIG.CONTRACT_ADDRESS
    )
  }

  async getNFTData(tokenId) {
    const owner = await this.contract.methods.ownerOf(tokenId).call()
    let tokenUri = await this.contract.methods.tokenURI(tokenId).call()
    tokenUri = this.convertIPFSUrl(tokenUri)

    try {
      const metadata = await fetch(tokenUri).then((res) => res.json())
      const imageUrl = this.convertIPFSUrl(metadata.image)

      // Return complete metadata including name and description
      return {
        tokenId,
        owner,
        imageUrl,
        image: imageUrl, // Add image property for compatibility
        name: metadata.name || `NFT ${tokenId}`,
        description: metadata.description || `This is NFT with token ID ${tokenId}`
      }
    } catch (error) {
      console.error(`Failed to fetch metadata for token ${tokenId}:`, error)
      // Return minimal data if metadata fetch fails
      return {
        tokenId,
        owner,
        imageUrl: `https://via.placeholder.com/300?text=NFT+${tokenId}`,
        image: `https://via.placeholder.com/300?text=NFT+${tokenId}`,
        name: `NFT ${tokenId}`,
        description: `Metadata unavailable for token ID ${tokenId}`
      }
    }
  }

  async getTotalSupply() {
    try {
      return await this.contract.methods.totalSupply().call()
    } catch (error) {
      console.error('Failed to get total supply:', error)
      throw error
    }
  }

  async getOwnerOf(tokenId) {
    try {
      return await this.contract.methods.ownerOf(tokenId).call()
    } catch (error) {
      console.error(`Failed to get owner of token ${tokenId}:`, error)
      throw error
    }
  }

  convertIPFSUrl(url) {
    return url.startsWith('ipfs://')
      ? url.replace('ipfs://', 'https://ipfs.io/ipfs/')
      : url
  }
}

export { NFTService, NFT_CONFIG }
