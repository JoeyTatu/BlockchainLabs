// Read in a file of account addresses
// Count the number of addresses
// Get the remaining supply between the accounts
// Collect tea and medals

const doDistro = async() => {
    let fs = require("fs");
    let contract = require("./contract.js");

    // Distribution addresses
    let disAddresses = fs.readFileSync("./accounts.txt", "utf8").split(",");

    console.log(`There are ${disAddresses.length} distribution addresses. They are ${disAddresses}`);

    let symbol = await contract.getSymbol();
    console.log(`Token symbol: ${symbol}`)
}

doDistro();

