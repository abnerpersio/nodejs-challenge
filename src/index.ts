import './bootstrap';
import 'express-async-errors';
import express from 'express';
import router from './routes';
import ErrorHandler from './shared/middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use(router);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
