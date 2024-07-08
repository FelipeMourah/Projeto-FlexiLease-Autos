import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../swagger.json'), 'utf8'),
);

function setupSwagger(app: Express) {
  app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export { setupSwagger, swaggerDocument };
