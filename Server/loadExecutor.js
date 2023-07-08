require('dotenv').config();
const { ethers } = require('ethers');

const seedPhrase = process.env.PRIVATE_EXECUTOR_SEED_PHRASE;


// Load wallet from seed phrase
const wallet = ethers.Wallet.fromPhrase(seedPhrase);

// Print the wallet address
console.log('Wallet Address:', wallet.address);

// You can also access the private key if needed
console.log('Private Key:', wallet.privateKey);
