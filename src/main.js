const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ed4080a5c9125847ebfe5b8d51f17ebf2f2954f099148bfead6de5bf0ca85c2a');
const myWalletAddress = myKey.getPublic('hex');

let coin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key', 10);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log('\nStarting the miner...');
coin.minePendingTransactions(myWalletAddress);

console.log('balance of my-balance is ' + coin.getBalanceOfAddress(myWalletAddress));