import express from 'express';
import { connectToDatabase } from './config/database';
import routes from './shared/infra/http/routes';
import { setupSwagger } from './config/swaggerConfig';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/Api/v1', routes);

// Configurando Swagger
setupSwagger(app);

// Conectando ao banco de dados
connectToDatabase().catch(console.error);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
