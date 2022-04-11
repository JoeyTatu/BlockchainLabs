// Read in a file of account addresses
// Count the number of addresses
// Get the remaining supply between the accounts
// Collect tea and medals

require('dotenv').config();

const infuraToken = process.env.INFURA_TOKEN;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ownerAddress = process.env.OWNER_ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

const doDistro = async() => {
    let fs = require("fs");
    let contract = require("./contract.js");

    // Distribution addresses
    let disAddresses = fs.readFileSync("./accounts.txt", "utf8").split(",");

    console.log(`There are ${disAddresses.length} distribution addresses. They are ${disAddresses}`);

    let symbol = await contract.getSymbol();
    // console.log(`Token symbol: ${symbol}`)

    let reaminingSupply = await contract.getBalance(ownerAddress);
    let fivePercent = reaminingSupply/20;
    console.log(`5% of ${reaminingSupply} is ${fivePercent}`);
}

doDistro();

