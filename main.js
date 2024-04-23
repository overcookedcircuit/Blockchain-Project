const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //For proof of work
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        //By increasing the difficulty, it takes a much longer process time for the computer to mine the block
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, "2024/04/23", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            //Check if block points to current previous block
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let coin = new Blockchain();

console.log('Mining block 1...');
coin.addBlock(new Block(1, "2024/04/15", {amount: 4}));

console.log('Mining block 2...');
coin.addBlock(new Block(2, "2024/04/16", {amount: 5}));




/*
Tempering with the blockchain
method returns false

coin.chain[1].data = {amount: 1000};
coin.chain[1].hash = coin.chain[1].calculateHash();
console.log('Is blockchain valid? ' + coin.isChainValid());
*/