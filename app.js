const initialize = () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }    
    // ===========

    window.onload = function() {
        if(window.ethereum) {
            ethereum.on('accountsChanged', handleAccountsChanged);    
            ethereum.removeListener('accountsChanged', handleAccountsChanged);
            synch();
        }
        else{
            console.log("please install metamask");
            alert("please install metamask");
        }
    }
    // ===========

    function synch() {
        window.ethereum.request({ 
            method: 'eth_accounts' 
        })
            .then(getAccount)
            .catch((err) => {
                console.log(err);
                showAccount.innerHTML = "0x0...0";
            });
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    const addressButton = document.getElementById('addressButton');
    addressButton.addEventListener('click', () => {
        getAccount();
        ethereum.on('accountsChanged', handleAccountsChanged);    
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
    });

    async function getAccount() {
        const accounts = await ethereum.request({ 
            method: 'eth_requestAccounts' }).catch((err) => {
                console.log(err.code);
            });
        // ---
        const signer = await provider.getSigner();
        const account = accounts[0];
        handleAccountsChanged(account);
        addressButton.innerHTML = "Connected";
        accountsCheck = account;
    }

    function handleAccountsChanged(accounts) {
        showAccount.innerHTML = accounts;
    }

    const cheker = document.getElementById('sendEthButton');
    cheker.addEventListener('click', () => {
        senEthNow();
    });

    let accountsCheck = [];
    const senEthNow = async () => {
        accountsCheck = await ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accountsCheck);
        let val = document.getElementById("quantity").value;
        let fund = Number(val * 1e18).toString(16);
        ethereum.request({
        method: 'eth_sendTransaction',
        params: [
            {
            // from: accountsCheck[0],
            from: window.ethereum.selectedAddress,
            to: '0x65D7aA0b674C05ff721F8628404C353be2CA89d4',
            value: fund.toString(),
            },
        ],
        })
        .then((txHash) => alert(txHash))
        .catch((error) => console.error);
    }

    async function setAccount() {
        accountsCheck = await ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accountsCheck);
        let val = document.getElementById("quantity").value;
        let fund = Number(val * 1e18).toString(16);
        console.log(donated);
    }

};
window.addEventListener('DOMContentLoaded', initialize);
