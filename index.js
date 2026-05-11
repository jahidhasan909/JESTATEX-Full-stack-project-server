const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT
const uri = process.env.MONGODB_URI


app.use(cors())
app.use(express.json())



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const run = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const database = client.db('jestatex')
        const jestatexProperty = database.collection('jestatexproperty')


        app.post('/property', async (req, res) => {
            const propertys = req.body


            const result = await jestatexProperty.insertOne(propertys);
            res.send(result)
        })

        app.get('/property', async (req, res) => {
            const result = await jestatexProperty.find().toArray()
            res.send(result)
        })
        app.get('/property/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await jestatexProperty.findOne(query)
            res.send(result)
        })



    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is runing')
})

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})
