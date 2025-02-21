class UIManager {
    constructor() {
        this.container = document.getElementById("nft-container");
        this.loading = document.getElementById("loading");
    }

    createNFTCard({ tokenId, owner, imageUrl }, onBuyClick) {
        const nftDiv = document.createElement("div");
        nftDiv.className = "nft-item";

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `Token ${tokenId}`;

        const ownerP = document.createElement("p");
        ownerP.className = "owner-address";
        ownerP.textContent = `Owner: ${owner}`;

        const buyButton = document.createElement("button");
        buyButton.className = "action-button buy-button";
        buyButton.textContent = "Buy NFT";
        buyButton.onclick = () => onBuyClick(tokenId);

        nftDiv.append(img, ownerP, buyButton);
        return nftDiv;
    }

    createMyNFTCard({ tokenId, owner, imageUrl }, onListClick) {
        const nftDiv = document.createElement("div");
        nftDiv.className = "nft-item";

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `Token ${tokenId}`;

        const tokenIdP = document.createElement("p");
        tokenIdP.className = "token-id";
        tokenIdP.textContent = `Token ID: ${tokenId}`;

        const listButton = document.createElement("button");
        listButton.className = "action-button list-button";
        listButton.textContent = "List for Sale";
        listButton.onclick = () => onListClick(tokenId);

        nftDiv.append(img, tokenIdP, listButton);
        return nftDiv;
    }

    clearContainer() {
        this.container.innerHTML = "";
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showError(tokenId, error) {
        console.error(`Token ${tokenId} の読み込みに失敗:`, error);
    }
}

export { UIManager };