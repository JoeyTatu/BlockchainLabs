// For ECDH -- https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman
//ECDH is a key aggreement

// Alice has a private key and a public key (elliptic curve)
// Bob has a private key and a public key

// ALice gives Bob her public key
// Bob gives Alice his public key

// Alice and Bob will then agree on the same secret,
// which they use to encrypt communications

// This is the KEY EXCHANGE

// How does this work?
// Alice's public key = G * PrivateKey(A)
// Bob's public key = G * PrivateKey(B)

// Alice's ECDH secret = PrivateKey(A) * G * PrivateKey(B)
// Bob's ECDH secret = PrivateKey(B) * G * PrivateKey(A)
// PrivKey(A) * G * PrivateKey(B) = PrivateKey(B) * G * PrivateKey(A)

var sodium = require('sodium-native');
console.log(`ECDH demo\n`);

const publicKeyBytes = sodium.crypto_box_PUBLICKEYBYTES
const privateKeyBytes = sodium.crypto_box_SECRETKEYBYTES;

console.log(`Public key: ${publicKeyBytes} bytes long`);
console.log(`Private key: ${privateKeyBytes} bytes long`);

// Make an Alice keypair
var alicePrivateKey = sodium.sodium_malloc(privateKeyBytes);
var alicePublicKey =  sodium.sodium_malloc(publicKeyBytes);

sodium.crypto_box_keypair(alicePublicKey, alicePrivateKey);
console.log(`Alice's public key: 0x${alicePublicKey.toString('hex')}`);

// Make a Bob keypair
var bobPrivateKey = sodium.sodium_malloc(privateKeyBytes);
var bobPublicKey =  sodium.sodium_malloc(publicKeyBytes);

sodium.crypto_box_keypair(bobPublicKey, bobPrivateKey);
console.log(`Bob's public key: 0x${bobPublicKey.toString('hex')}`);

// Scalar multipation
const secretBytes = sodium.crypto_scalarmult_BYTES;
console.log(`Secret: ${secretBytes.toString()} bytes long`);

//// Get Alice's secret
var aliceSecret = sodium.sodium_malloc(secretBytes);
sodium.sodium_memzero(aliceSecret); // Wipe the memory location
sodium.crypto_scalarmult(aliceSecret, alicePrivateKey, bobPublicKey);

console.log(`Alice's secret: 0x${aliceSecret.toString('hex')}`);

//// Get Bob's secret
var bobSecret = sodium.sodium_malloc(secretBytes);
sodium.sodium_memzero(bobSecret); // Wipe the memory location
sodium.crypto_scalarmult(bobSecret, bobPrivateKey, alicePublicKey);

console.log(`Bob's secret: 0x${bobSecret.toString('hex')}`);

if (aliceSecret.toString('hex') == bobSecret.toString('hex')){

    console.log(`Secrets match!`);

} else {

    console.log(`Secrets DO NOT match!`);

}