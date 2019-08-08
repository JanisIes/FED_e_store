import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('OrderController');

const indexAction = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const sql = 'SELECT * from orders';
        const data = await makeQuery(sql);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};


const getOrderByID = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);

    const {orderID} = req.params;

    try {
        const sql = 'SELECT * from users WHERE ID = ?';
        const data = await makeQuery(sql, req.params.orderID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const addNewOrder = async (req, res, next) => {
    const {body} = req;
    const {
        sum,
        user_id,
    } = body;

    const sql = `INSERT INTO orders set ?`;
    try {
        const data = await makeQuery(sql, {
            sum,
            user_id,
        });
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getOrderByID, addNewOrder};
