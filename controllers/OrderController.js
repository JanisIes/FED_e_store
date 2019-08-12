import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('OrderController');

const getProductFromDB = (orderID) => {
    const sql = 'SELECT * from orders WHERE ID = ?';
    return makeQuery(sql, orderID);
};

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
        const data = await makeQuery(sql, orderID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const modifyOrder = async (req, res, next) => {
    const {orderID} = req.params;

    if (orderID) {
        const data = await getProductFromDB(orderID);
        if (data.length === 0) {
            return res.status(404).send('Order not found!');
        }
    }


    const {body} = req;

    const sql = `${!orderID ? 'INSERT INTO' : 'UPDATE'} orders SET ?
                    ${!orderID ? '' : 'WHERE ID = ?'
    }`;

    try {
        const data = await makeQuery(sql, [body, orderID]);
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

const deleteOrder = async (req, res, next) => {
    const {orderID} = req.params;

    const data = await getProductFromDB(orderID);
    if (data.length === 0) {
        return res.status(404).send('Order not found!');
    }

    const sql = `DELETE FROM orders WHERE ID = ?`;
    try {
        const data = await makeQuery(sql, orderID);
        res.status(202).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getOrderByID, modifyOrder, deleteOrder};
