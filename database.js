const { MongoClient } = require('mongodb');
const fs = require('fs')


async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://theWasabiBees:theWasabiBees@thewasabibeesspike.n3qvyoo.mongodb.net/?retryWrites=true&w=majority";
    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await createListing(client, {
             pickup_destination: "Manchester Picadilly",
             dropoff_destination: "KPMG Office",
             date: Date.now()
            }
        )

        return await findListings(client)

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

// Add functions that make DB calls here

async function createListing(client, newListing){
    const result = await
    client.db("Gett_Spike").collection("gett_spike").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`)
}

async function findListings(client) {
    const cursor = client
      .db("Gett_Spike")
      .collection("gett_spike")
      .find()
  
    const result = await cursor.toArray();
    const resultString= JSON.stringify(result)
    fs.writeFile("taxi.txt", resultString, (err) => {
        if (err)
          console.log(err);
    })
}


