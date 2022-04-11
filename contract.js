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

const Web3 =  require("web3");


