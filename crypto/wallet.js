// in our Metamask, we have a number of ethereum addressses
// this code will show you how to create those addresses

// using BIP39, BIP44
// BIP39 is the seed phrase.
// BIP44 is the path.

// To generate the ETH address:
// An secp256K1 keypair
// Then, we take the public key
// keccak256 hash it 
// drop the first 12 bytes

// load the dependencies 
const Wallet = require("ethereumjs-wallet").default;
const keccak256 = require('keccak256');

const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");

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
    const mnemonic = "seed phrase seed phrase seed phrase seed phrase seed phrase seed phrase";

    // let seed = bip39.mnemonicToSeed(mnemonic); //returns [object Promise]
    let seed = await bip39.mnemonicToSeed(mnemonic); // "await" waits for correct seed before returning
    // console.log(`Seed: ${seed}`);

    let hdWallet = hdkey.fromMasterSeed(seed);
    const path = "m/44'/60'/0'/0/0";
    const path2 = "m/44'/60'/0'/0/1";
    const wallet = await hdWallet.derivePath(path).getWallet();
    console.log(`Wallet: ${wallet}`);
    
    const pubKey = wallet.getPublicKey();
    const hashedPubKey = keccak256(pubKey).toString('hex');
    console.log(`Hashed public key: 0x${hashedPubKey}`);
    const ethAddress = hashedPubKey.substring(24);
    console.log(`Eth address: 0x${ethAddress}`);

}

getHDWalletDetails();


// console.log("This is the wallet creation file");