import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('ManufactureController');

const getProductFromDB = (manufactureID) => {
    const sql = 'SELECT * from manufacture WHERE ID = ?';
    return makeQuery(sql, manufactureID);
};

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

const modifyManufacturer = async (req, res, next) => {
    const {manufactureID} = req.params;

    if (manufactureID) {
        const data = await getProductFromDB(manufactureID);
        if (data.length === 0) {
            return res.status(404).send('Manufacturer not found!');
        }
    }


    const {body} = req;

    const sql = `${!manufactureID ? 'INSERT INTO' : 'UPDATE'} manufacture SET ?
                    ${!manufactureID ? '' : 'WHERE ID = ?'
    }`;

    try {
        const data = await makeQuery(sql, [body, manufactureID]);
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

const deleteManufacturer = async (req, res, next) => {
    const {manufactureID} = req.params;

    const data = await getProductFromDB(manufactureID);
    if (data.length === 0) {
        return res.status(404).send('Manufacturer not found!');
    }

    const sql = `DELETE FROM manufacture WHERE ID = ?`;
    try {
        const data = await makeQuery(sql, manufactureID);
        res.status(202).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getManufactureByID, modifyManufacturer, deleteManufacturer};
