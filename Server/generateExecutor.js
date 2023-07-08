const { ethers } = require('ethers');

// Generate a new wallet
const wallet = ethers.Wallet.createRandom();

// Print the wallet address
console.log('Wallet Address:', wallet.address);

// Export the seed phrase
const seedPhrase = wallet.mnemonic.phrase;
console.log('Seed Phrase:', seedPhrase);
