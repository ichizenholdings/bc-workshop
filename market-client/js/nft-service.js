// NFT関連の定数
const NFT_CONFIG = {
    CONTRACT_ADDRESS: "0x4998e0865B55e922214DEEBfdc5BF18d6c7A1386",
    RPC_URL: "https://sepolia.drpc.org",
    MAX_TOKEN_ID: 9
};

// 最小限のERC721 ABI
const NFT_ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "tokenId", "type": "uint256" }],
        "name": "ownerOf",
        "outputs": [{ "name": "", "type": "address" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "tokenId", "type": "uint256" }],
        "name": "tokenURI",
        "outputs": [{ "name": "", "type": "string" }],
        "type": "function"
    }
];

class NFTService {
    constructor(web3) {
        this.web3 = web3 || new Web3(NFT_CONFIG.RPC_URL);
        this.contract = new this.web3.eth.Contract(NFT_ABI, NFT_CONFIG.CONTRACT_ADDRESS);
    }

    async getNFTData(tokenId) {
        const owner = await this.contract.methods.ownerOf(tokenId).call();
        let tokenUri = await this.contract.methods.tokenURI(tokenId).call();
        tokenUri = this.convertIPFSUrl(tokenUri);

        const metadata = await fetch(tokenUri).then(res => res.json());
        const imageUrl = this.convertIPFSUrl(metadata.image);

        return { tokenId, owner, imageUrl };
    }

    convertIPFSUrl(url) {
        return url.startsWith("ipfs://")
            ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
            : url;
    }
}

export { NFTService, NFT_CONFIG };