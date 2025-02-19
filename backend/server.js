import path from 'path';
import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import connectMongoDB from './db/connectMongoDB.js';
import { ENV_VARS } from './config/envVars.js';

const __dirname = path.resolve();
const app = new express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', routes);

if (ENV_VARS.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT);
  connectMongoDB();
});
