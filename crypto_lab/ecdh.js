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
// Alice's public key = G * PrivKey(A)
// Bob's public key = G * PrivKey(B)

// Alice's ECDH secret = PrivKey(A) * G * PrivKey(B)
// Bob's ECDH secret = PrivKey(B) * G * PrivKey(A
// PrivKey(A) * G * PrivKey(B) = PrivKey(B) * G * PrivKey(A)

var sodium = require('sodium_native');
