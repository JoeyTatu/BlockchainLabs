// Read in a file of account addresses
// Count the number of addresses
// Get the remaining supply between the accounts
// Get 5% of remainng supply between the accounts
// Loop through accounts running token transfer of 5%
// Collect tea and medals

let fs = require("fs");
let contract = require("./contract.js");
let BigNumber = require("big-number"); 
require('dotenv').config();


const infuraToken = process.env.INFURA_TOKEN;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ownerAddress = process.env.OWNER_ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

const doDistro = async() => {
    // Distribution addresses
    let disAddresses = fs.readFileSync("./accounts.txt", "utf8").split(",");

    console.log(`There are ${disAddresses.length} distribution addresses. They are ${disAddresses}`);

    let symbol = await contract.getSymbol();
    // console.log(`Token symbol: ${symbol}`)

    let reaminingSupply = await contract.getBalance(ownerAddress);
    let ownerBal = new BigNumber(reaminingSupply);
    let fivePercentOfBalance = ownerBal.div(20);
    console.log(`Five % of ${ownerBal} is ${fivePercentOfBalance}`);

    let noOfAddresses = disAddresses.length
    let disAmount = fivePercentOfBalance.div(noOfAddresses);

    for (i=0; i < noOfAddresses; i++){
        console.log(`Distributing to ${disAddresses[i]} with ${disAmount} ${symbol}. Waiting for reply.`);
        let returnValue = trandferToken(ownerAddress, disAddresses[i], disAmount);
    }
}

doDistro();

