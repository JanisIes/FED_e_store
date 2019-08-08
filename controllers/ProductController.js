import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';
import {body} from "express-validator/check";

const logger = require('../utils/logger')('ProductController');

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
        const sql = 'SELECT * from products WHERE ID = ?';
        const data = await makeQuery(sql, req.params.productID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const addNewProduct = async (req, res, next) => {
    const {body} = req;
    const {
        title,
        description,
        image,
        price,
        amount,
        category_id,
        rate,
        vote,
        discount,
        manufacture_id,
    } = body;

    const sql = `INSERT INTO products set ?`;
    try {
        const data = await makeQuery(sql, {
            title,
            description,
            image,
            price,
            amount,
            category_id,
            rate,
            vote,
            discount,
            manufacture_id,
        });
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};
export {indexAction, getProductByID, addNewProduct};
