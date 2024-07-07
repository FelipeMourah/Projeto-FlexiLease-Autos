import { MongoClient, ServerApiVersion } from 'mongodb';

const uri =
  'mongodb+srv://FelipeMourah:9SVG82eyQwOK4jqg@projeto-flexilease-auto.kxsxdcc.mongodb.net/?appName=Projeto-FlexiLease-Autos';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1); // Exit process with failure
  } finally {
    await client.close();
  }
}
