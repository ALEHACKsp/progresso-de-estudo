import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import routes from './routes';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
const app = express();
app.use(express.json());
app.use(routes);

export default app;
