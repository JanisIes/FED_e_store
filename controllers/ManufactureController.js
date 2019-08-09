import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('ManufactureController');

const indexAction = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const sql = 'SELECT * from manufacture';
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
        const data = await makeQuery(sql, manufactureID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const addNewManufacturer = async (req, res, next) => {
    const {body} = req;


    const sql = `INSERT INTO manufacture set ?`;
    try {
        const data = await makeQuery(sql, body);
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getManufactureByID, addNewManufacturer};
