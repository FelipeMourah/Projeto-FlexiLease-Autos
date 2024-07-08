import express from 'express';
import { connectToDatabase } from './config/database';
import routes from './shared/infra/http/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', routes);

connectToDatabase().catch(console.error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
