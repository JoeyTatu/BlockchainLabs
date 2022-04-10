// in our Metamask, we have a number of ethereum addressses
// this code will show you how to create those addresses

// using BIP39, BIP44

// To generate the ETH address:
// An secp256K1 keypair
// Then, we take the public key
// keccak256 hash it 
// drop the first 12 bytes

// load the dependencies 
const Wallet = require("ethereumjs-wallet").default;
const keccak256 = require('keccak256');

const getWalletDetails = async() => {
    console.log("Async function started")
}

getWalletDetails();

console.log("This is the wallet creation file");