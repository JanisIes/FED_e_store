import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('CategoryController');

const indexAction = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const sql = 'SELECT * from category';
        const data = await makeQuery(sql);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};


const getCategoryByID = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);

    const {categoryID} = req.params;

    try {
        const sql = 'SELECT * from category WHERE ID = ?';
        const data = await makeQuery(sql, req.params.categoryID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

export {indexAction, getCategoryByID};
