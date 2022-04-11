console.log("This is the contract.js file");

// This file will enable interaction with our smart contract
// We're going to read values from it
// and we're going to create transactions to write to it

// We want the following details
// - an infura token
// - a contract token
// - an owner address
// - a private for the owner address (because we're going to sign txs)

// We want to access our deployed smart contract
// and get its name, symbol, and the owner's balance 
// All these are read-only methods and shouldn't involve
// creating a tx

const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

require('dotenv').config();

const infuraToken = process.env.INFURA_TOKEN;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ownerAddress = process.env.OWNER_ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

// console.log(`Infura token: ${infuraToken}\nContract address: ${contractAddress}\nOwner address: ${ownerAddress}`);

const rpcURL = "https://ropsten.infura.io/v3/" + infuraToken;

console.log(`Infura URL: ${rpcURL}`);

const web3 = new Web3(rpcURL);
console.log(`Connected to web3`);

// Load in contract's ABI
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

// Create an instance of a contract instance object that
// - obeys the ABI
// - is at the address of our deployed contract
const contract = new web3.eth.Contract(abi, contractAddress);
console.log(`Connected to contract via web3`);

const getName = async() => {
    let name = await contract.methods.name().call();
    console.log(`Name is ${name}`);
    return name;
}

const getSymbol = async() => {
    let symbol = await contract.methods.symbol().call()
    console.log(`Symbol is ${symbol}`);
    return symbol;
}

const getDecimals = async() => {
    let decimals = await contract.methods.decimals().call();
    console.log(`Decimals: ${decimals}`);
    return decimals;
}

const getTotalSupply = async() => {
    let totalSupply = await contract.methods.totalSupply().call();
    console.log(`Total Supply: ${totalSupply}`);
    return totalSupply;

}

const getBalance = async(address) => {
    let balance = await contract.methods.balanceOf(address).call();
    console.log(`Balance of address ${address}: ${balance}`);
    return balance;
}

const transferToken = async(fromAddress, toAddress, amount) => {
    // to create an Eth transaction
    // we need a private key to sign the tx
    // we also need a nonce (counter) to prevent tx replays

    const nonce = await web3.eth.getTransactionCount(fromAddress);
    console.log(`Nonce of ${nonce} for address ${fromAddress}`)

    const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        to: contractAddress,
        data: contract.methods.transfer(toAddress, amount).encodeABI()
    }

    const tx = new Tx(txObject, {chain: 'ropsten', hardfork: 'petersburg'});

    tx.sign(privateKey);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');
    console.log("Waiting for tx response.");

    let txResponse = await web3.eth.sendSignedTransaction(raw);

    console.log(`Tx complete.`); 
    console.log(`Tx Block: ${txResponse.blockNumber}`);
    console.log(`Tx Hash: ${txResponse.transactionHash}`)
}

// const getAllContractInfo = async => {
//     // getName();                           // Read-only
//     // getSymbol();                         // Read-only
//     // getDecimals();                       // Read-only
//     // getTotalSupply();                    // Read-only
//     // getBalance(ownerAddress);     // Read-only
//     transferToken(ownerAddress, "0x56212F540b4a1057cEBD6d10EE66D56a527CfCA2", 10000000000)}

// getAllContractInfo();

module.exports = {getName, getSymbol, getDecimals, getTotalSupply, getBalance, transferToken};
