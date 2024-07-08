import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri =
  'mongodb+srv://FelipeMourah:9SVG82eyQwOK4jqg@projeto-flexilease-auto.kxsxdcc.mongodb.net/?retryWrites=true&w=majority&appName=Projeto-FlexiLease-Autos';

let client: MongoClient;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );

    cachedDb = client.db('admin');
    return cachedDb;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}
