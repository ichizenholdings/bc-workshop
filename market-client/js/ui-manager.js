class UIManager {
    constructor() {
        this.container = document.getElementById("nft-container");
        this.loading = document.getElementById("loading");
    }

    createNFTCard(nftData, buyNFT, marketPrice) {
        const card = document.createElement('div');
        card.className = 'nft-card';

        // NFT画像
        const img = document.createElement('img');
        img.src = nftData.image || nftData.imageUrl;
        img.alt = nftData.name;
        card.appendChild(img);

        // NFT情報コンテナ
        const infoContainer = document.createElement('div');
        infoContainer.className = 'nft-info';

        // Token ID
        const tokenIdSpan = document.createElement('span');
        tokenIdSpan.className = 'token-id';
        tokenIdSpan.textContent = `Token #${nftData.tokenId}`;
        infoContainer.appendChild(tokenIdSpan);

        // NFTタイトル
        const title = document.createElement('h2');
        title.textContent = nftData.name;
        infoContainer.appendChild(title);

        // NFT説明
        const desc = document.createElement('p');
        desc.textContent = nftData.description;
        infoContainer.appendChild(desc);

        // オーナー情報
        const ownerInfo = document.createElement('div');
        ownerInfo.className = 'owner-info';

        // オーナーラベル
        const ownerLabel = document.createElement('span');
        ownerLabel.className = 'owner-label';
        ownerLabel.textContent = 'Owner:';
        ownerInfo.appendChild(ownerLabel);

        // オーナーアイコン（Blockies）
        const ownerIcon = document.createElement('div');
        ownerIcon.className = 'owner-icon';
        if (window.blockies) {
            const icon = window.blockies.create({
                seed: nftData.owner.toLowerCase(),
                size: 8,
                scale: 3
            });
            ownerIcon.appendChild(icon);
        }
        ownerInfo.appendChild(ownerIcon);

        // オーナーアドレス
        const ownerAddress = document.createElement('div');
        ownerAddress.className = 'owner-address';
        ownerAddress.textContent = `${nftData.owner.substring(0, 6)}...${nftData.owner.substring(38)}`;
        ownerInfo.appendChild(ownerAddress);

        infoContainer.appendChild(ownerInfo);

        // 購入ボタンの作成
        const button = document.createElement('button');
        if (marketPrice && marketPrice !== '0') {
            // Web3のユーティリティを使ってweiからETHに変換
            const priceEth = Web3.utils.fromWei(marketPrice, 'ether');
            button.className = 'buy-button';
            button.textContent = `${priceEth} ETHで購入`;
            button.onclick = () => buyNFT(nftData.tokenId);
        } else {
            button.className = 'buy-button disabled';
            button.textContent = '現在出品されていません';
            button.disabled = true;
        }
        infoContainer.appendChild(button);

        card.appendChild(infoContainer);
        return card;
    }

    createMyNFTCard(nftData, onListClick) {
        const card = document.createElement('div');
        card.className = 'nft-card';

        // NFT画像
        const img = document.createElement('img');
        img.src = nftData.image || nftData.imageUrl;
        img.alt = nftData.name || `Token ${nftData.tokenId}`;
        card.appendChild(img);

        // NFT情報コンテナ
        const infoContainer = document.createElement('div');
        infoContainer.className = 'nft-info';

        // Token ID
        const tokenIdSpan = document.createElement('span');
        tokenIdSpan.className = 'token-id';
        tokenIdSpan.textContent = `Token #${nftData.tokenId}`;
        infoContainer.appendChild(tokenIdSpan);

        // NFTタイトル
        const title = document.createElement('h2');
        title.textContent = nftData.name || `NFT ${nftData.tokenId}`;
        infoContainer.appendChild(title);

        // NFT説明（あれば）
        if (nftData.description) {
            const desc = document.createElement('p');
            desc.textContent = nftData.description;
            infoContainer.appendChild(desc);
        }

        // オーナー情報
        const ownerInfo = document.createElement('div');
        ownerInfo.className = 'owner-info';

        // オーナーラベル
        const ownerLabel = document.createElement('span');
        ownerLabel.className = 'owner-label';
        ownerLabel.textContent = 'Owner:';
        ownerInfo.appendChild(ownerLabel);

        // オーナーアイコン（Blockies）
        const ownerIcon = document.createElement('div');
        ownerIcon.className = 'owner-icon';
        if (window.blockies) {
            const icon = window.blockies.create({
                seed: nftData.owner.toLowerCase(),
                size: 8,
                scale: 3
            });
            ownerIcon.appendChild(icon);
        }
        ownerInfo.appendChild(ownerIcon);

        // オーナーアドレス（自分）
        const ownerAddress = document.createElement('div');
        ownerAddress.className = 'owner-address';
        ownerAddress.textContent = `${nftData.owner.substring(0, 6)}...${nftData.owner.substring(38)} (You)`;
        ownerInfo.appendChild(ownerAddress);

        infoContainer.appendChild(ownerInfo);

        // 出品ボタン
        const listButton = document.createElement('button');
        listButton.className = 'action-button list-button';
        listButton.textContent = 'List for Sale';
        listButton.onclick = () => onListClick(nftData.tokenId);
        infoContainer.appendChild(listButton);

        card.appendChild(infoContainer);
        return card;
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