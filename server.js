import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import fileUpload from 'express-fileupload';
import healthCheck from './routes/healthCheck';
import HomeRoute from './routes/HomeRoute';
import ProductRoute from './routes/ProductRoute';
import ManufactureRoute from './routes/ManufactureRoute';
import CommentRoute from './routes/CommentRoute';
import CategoryRoute from './routes/CategoryRoute';
import OrderRoute from './routes/OrderRoute';
import UserRoute from './routes/UserRoute';
import FileRoute from './routes/FileRoute';
import defaultErrorHandler from './middlewares/defaultErrorHandler';
import {error} from "winston";


const logger = require('./utils/logger')(process.env.APP_NAME);


const app = express();

app.use(
    fileUpload({
        createParentPath: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/public`));
app.use(`/files`, FileRoute);

app.use(`/api/v${process.env.API_VERSION}`, healthCheck);
app.use(`/`, HomeRoute);
app.use(`/products`, ProductRoute);
app.use(`/manufacturers`, ManufactureRoute);
app.use(`/comments`, CommentRoute);
app.use(`/categories`, CategoryRoute);
app.use(`/orders`, OrderRoute);
app.use(`/users`, UserRoute);
app.use(`/users`, UserRoute);


app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
    logger.log(
        'info',
        `App is running at http://localhost:${process.env.APP_PORT} in ${app.get('env')} mode.`,
    );
});

module.exports = app;
