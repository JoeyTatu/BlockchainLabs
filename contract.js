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

require('dotenv').config();

const infuraToken = process.env.INFURA_TOKEN;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ownerAddress = process.env.OWNER_ADDRESS;
// privateKey = process.env.PRIVATE_KEY;

// console.log(`Infura token: ${infuraToken}\nContract address: ${contractAddress}\nOwner address: ${ownerAddress}`);

const rpcURL = "https://ropsten.infura.io/v3/" + infuraToken;

console.log(`Infura URL: ${rpcURL}`);

const web3 = new Web3(rpcURL);
console.log(`Connected to web3`);
console.log(`${web3.toString('hex')}`);


