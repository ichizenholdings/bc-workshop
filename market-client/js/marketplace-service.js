import { NFT_CONFIG } from './nft-service.js';

class MarketplaceService {
    constructor(web3) {
        this.web3 = web3;
        // Marketplace.jsonからABIを取得
        fetch('../contracts/artifacts/Marketplace.json')
            .then(response => response.json())
            .then(data => {
                this.contract = new web3.eth.Contract(
                    data.abi,
                    MARKETPLACE_CONFIG.CONTRACT_ADDRESS
                );
            });
    }

    async listNFT(tokenId, priceWei) {
        const accounts = await this.web3.eth.getAccounts();
        if (!accounts[0]) throw new Error("No wallet connected");

        // まずNFTコントラクトのapproveを呼び出し
        await this.approveNFT(tokenId);

        // その後、マーケットプレイスのlistItemを呼び出し
        return this.contract.methods
            .listItem(NFT_CONFIG.CONTRACT_ADDRESS, tokenId, priceWei)
            .send({ from: accounts[0] });
    }

    async approveNFT(tokenId) {
        const accounts = await this.web3.eth.getAccounts();
        const nftContract = new this.web3.eth.Contract(
            NFT_ABI,
            NFT_CONFIG.CONTRACT_ADDRESS
        );

        return nftContract.methods
            .approve(MARKETPLACE_CONFIG.CONTRACT_ADDRESS, tokenId)
            .send({ from: accounts[0] });
    }
}

// マーケットプレイスの設定
const MARKETPLACE_CONFIG = {
    CONTRACT_ADDRESS: "YOUR_MARKETPLACE_CONTRACT_ADDRESS" // デプロイ後のアドレスを設定
};

const MARKETPLACE_ABI = [
    {
        "inputs": [
            {"name": "nftContract", "type": "address"},
            {"name": "tokenId", "type": "uint256"},
            {"name": "price", "type": "uint256"}
        ],
        "name": "listItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export { MarketplaceService };