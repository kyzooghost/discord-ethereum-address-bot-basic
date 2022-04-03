const { ddbDocClient } = require("./client")
const { PutCommand, DeleteCommand, ScanCommand, GetCommand } = require("@aws-sdk/lib-dynamodb")

// Get the Ethereum address linked to a Discord username
async function getEthAddress(discordName) {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            discordName: discordName,
        },
    };
    try {
        const data = await ddbDocClient.send(new GetCommand(params));
        console.log("Successful getEthAddress: ", data.Item.ethAddress);
        return data.Item.ethAddress
    } catch (err) {
        console.error(err)
        throw 'getEthAddress error'
    }
}

// Get the entire key-value list (key = discordName, value = ethAddress)
// Some online comments warn against using ScanCommand for database with 6-7+ database entries
// Only anticipating 3-4 figure database entries for our app, should be fine
async function getList() {

    const params = {
        TableName: process.env.TABLE_NAME,
    };
  
    try {
      const data = await ddbDocClient.send(new ScanCommand(params));
      console.log("Successful getList: ", data.Items);
      return data.Items
    } catch (err) {
        console.error(err)
        throw 'getList error'
    }
}

// Delete the entry corresponding to 'discordName'
async function deleteEntry(discordName) {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            discordName: discordName,
        },
    };

    try {
        const data = await ddbDocClient.send(new DeleteCommand(params));
        console.log(`Success - ${discordName} entry deleted`);
    } catch (err) {
        console.error(err)
        throw 'deleteEntry error'
    }
}

// Create an entry with 'discordName' and 'ethAddress'
async function createEntry(discordName, ethAddress) {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            discordName: discordName,
            ethAddress: ethAddress,
        },
    }

    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log(`Success - ${discordName} : ${ethAddress} added`);
    } catch (err) {
        console.error(err)
        throw 'createEntry error'
    }
}

module.exports = { getEthAddress, getList, deleteEntry, createEntry }