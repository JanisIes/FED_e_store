import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('ManufactureController');

const indexAction = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const sql = 'SELECT * from manufacture WHERE ID = ?';
        const data = await makeQuery(sql);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};


const getManufactureByID = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);

    const {manufactureID} = req.params;

    try {
        const sql = 'SELECT * from manufacture WHERE ID = ?';
        const data = await makeQuery(sql, req.params.manufactureID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

export {indexAction, getManufactureByID};
