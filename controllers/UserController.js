import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('UserController');

const indexAction = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const sql = 'SELECT * from users';
        const data = await makeQuery(sql);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};


const getUserByID = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    const {userID} = req.params;

    try {
        const sql = 'SELECT * from users WHERE ID = ?';
        const data = await makeQuery(sql, req.params.userID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

export {indexAction, getUserByID};
