class WalletService {
    constructor() {
        this.web3 = null;
        this.accounts = [];
        this.onAccountsChanged = null;
        this.onChainChanged = null;
    }

    async connect() {
        if (typeof window.ethereum === "undefined") {
            throw new Error("ウォレットが見つかりません。MetaMaskまたはRabbyをインストールしてください。");
        }

        try {
            // EIP-1193準拠のウォレットに接続
            this.web3 = new Web3(window.ethereum);

            // アカウントへのアクセスを要求
            this.accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            // アカウント変更イベントのリスナーを設定
            window.ethereum.on('accountsChanged', (accounts) => {
                this.accounts = accounts;
                if (this.onAccountsChanged) {
                    this.onAccountsChanged(accounts[0]);
                }
            });

            return {
                address: this.accounts[0],
                web3: this.web3
            };
        } catch (error) {
            console.error("ウォレット接続エラー:", error);
            throw error;
        }
    }

    async getBalance(address) {
        if (!this.web3) {
            throw new Error("Web3が初期化されていません");
        }
        const balance = await this.web3.eth.getBalance(address);
        return this.web3.utils.fromWei(balance, 'ether');
    }

    isConnected() {
        return this.accounts.length > 0;
    }

    getCurrentAccount() {
        return this.accounts[0];
    }

    setAccountsChangedCallback(callback) {
        this.onAccountsChanged = callback;
    }

    async getNetworkInfo() {
        if (!this.web3) {
            throw new Error("Web3が初期化されていません");
        }
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const networkName = this.getNetworkName(chainId);
        return { chainId, networkName };
    }

    getNetworkName(chainId) {
        const networks = {
            '0x1': 'Ethereum Mainnet',
            '0x5': 'Goerli Testnet',
            '0xaa36a7': 'Sepolia Testnet',
            '0x89': 'Polygon Mainnet',
            '0x13881': 'Mumbai Testnet'
        };
        return networks[chainId] || `Unknown Network (${chainId})`;
    }

    setChainChangedCallback(callback) {
        this.onChainChanged = callback;
        window.ethereum.on('chainChanged', (chainId) => {
            if (this.onChainChanged) {
                this.onChainChanged(chainId);
            }
        });
    }
}

export { WalletService };