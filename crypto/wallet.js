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
    console.log("Async function started");
    
    const wallet = Wallet.generate();

    const pubKey = wallet.getPublicKey();
    // const hexPubKey = "0x" + pubKey.toString('hex');
    const hashedPubKey = keccak256(pubKey).toString('hex');
    // console.log(`Public key: ${hexPubKey}`);
    console.log(`Hashed public key: 0x${hashedPubKey}`);

    const ethAddress = hashedPubKey.substring(24);
    console.log(`Eth address: 0x${ethAddress}`);

    const privKey = wallet.getPrivateKey();
    // const hexPrivKey = "0x" + privKey.toString('hex');
    // const hashedPrivKey = keccak256(privKey).toString('hex');
    // // console.log(`Private key: ${hexPrivKey}\n`);
    // console.log(`Hashed private key: 0x${hashedPrivKey}\n`);
}

// getWalletDetails();

// // // Deterministic / HD wallet // // //

const getHDWalletDetails = async() => {
    console.log("Making a HD wallet");

}

getHDWalletDetails();


console.log("This is the wallet creation file");