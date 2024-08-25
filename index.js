import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import paymentRoutes from './src/routes/paymentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Just for testing quickly
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', paymentRoutes);

app.listen(4242, () => {
  console.log(`Node Server is listening on the http://localhost:${4242}`);
});
