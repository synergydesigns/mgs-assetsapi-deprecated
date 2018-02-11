import http from 'http';
import dotenv from 'dotenv';
import logger from 'js-logger';
import app from './routes';

dotenv.config({ silence: true });
logger.useDefaults();

const port = parseInt(process.env.PORT, 10) || 9090;
app.set('port', port);

const server = http.createServer(app);

app.listen(port);

logger.info(`Service running on ${process.env.HOST}:${port}`);

export default server;