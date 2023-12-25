import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/', router);
app.use(notFoundRoute);

app.use(globalErrorHandler);
export default app;
