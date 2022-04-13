// for ECDH
// Alice has a private key and a public key (elliptic curve)
// Bob has a private key and a public key

// Alice gives Bob her public key
// Bob gives Alice his public key

// Somehow, magically, Alice and Bob will then 
// agree on the same secret,
// which they can then use to encrypt communications

// this is a KEY EXCHANGE

// how does this work?

// alice's public key = G * PrivK(A)
// bob's public key = G * PrivK(B)

// alice's ecdh SECRET = PrivK(A) * G * PrivK(B)
// bob's ecdh SECRET = PrivK(B) * G * PrivK(A)

// PrivK(A) * G * PrivK(B) = PrivK(A) * G * PrivK(B)

var sodium = require("sodium-native");

console.log("ECDH demonstration");

const pubkeybytes = sodium.crypto_box_PUBLICKEYBYTES;
const privkeybytes = sodium.crypto_box_SECRETKEYBYTES;

//console.log(`private key is ${privkeybytes}-bytes-long`);
//console.log(`public key is ${pubkeybytes}-bytes-long`);

// make an alice key pair
var alicePrivKey = sodium.sodium_malloc(privkeybytes);
var alicePubKey = sodium.sodium_malloc(pubkeybytes);

sodium.crypto_box_keypair(alicePubKey, alicePrivKey);
//console.log(`alice's public key is: 0x${alicePubKey.toString("hex")}`)
console.log("created alice keypair");

// make a bob key pair
var bobPrivKey = sodium.sodium_malloc(privkeybytes);
var bobPubKey = sodium.sodium_malloc(pubkeybytes);

sodium.crypto_box_keypair(bobPubKey, bobPrivKey);
//console.log(`bob's public key is: 0x${bobPubKey.toString("hex")}`)
console.log("created bob keypair");

const secretbytes = sodium.crypto_scalarmult_BYTES;

// get alice's secret
var aliceSecret = sodium.sodium_malloc(secretbytes);

// wipe that memory location
sodium.sodium_memzero(aliceSecret);
sodium.crypto_scalarmult(aliceSecret, alicePrivKey, bobPubKey);
console.log(`alice's secret is 0x${aliceSecret.toString("hex")}`);

// get bob's secret
var bobSecret = sodium.sodium_malloc(secretbytes);

// wipe that memory location
sodium.sodium_memzero(bobSecret);
sodium.crypto_scalarmult(bobSecret, bobPrivKey, alicePubKey);
console.log(`bob's secret is 0x${bobSecret.toString("hex")}`);


