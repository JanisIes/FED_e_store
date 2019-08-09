import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';
import {body} from "express-validator/check";

const logger = require('../utils/logger')('ProductController');

const getProductFromDB = (productID) => {
    const sql = 'SELECT * from products WHERE ID = ?';
    return makeQuery(sql, productID);
};

const indexAction = async (req, res, next) => {

    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const sql = 'SELECT * from products';
        const data = await makeQuery(sql);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const getProductByID = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    const {productID} = req.params;
    try {
        const data = await getProductFromDB(productID);
        if (data.length === 0) {
            return res.status(404).send('Product not found!');
        }
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const modifyProduct = async (req, res, next) => {
    const {productID} = req.params;

    if (productID) {
        const data = await getProductFromDB(productID);
        if (data.length === 0) {
            return res.status(404).send('Product not found!');
        }
    }


    const {body} = req;

    const sql = `${!productID ? 'INSERT INTO' : 'UPDATE'} products SET ?
                    ${!productID ? '' : 'WHERE ID = ?'
    }`;

    try {
        const data = await makeQuery(sql, [body, productID]);
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};


const deleteProduct = async (req, res, next) => {
    const {productID} = req.params;

    const data = await getProductFromDB(productID);
    if (data.length === 0) {
        return res.status(404).send('Product not found!');
    }

    const sql = `DELETE FROM products WHERE ID = ?`;
    try {
        const data = await makeQuery(sql, productID);
        res.status(202).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getProductByID, modifyProduct, deleteProduct};
