import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('CategoryController');

const getProductFromDB = (categoryID) => {
    const sql = 'SELECT * from category WHERE ID = ?';
    return makeQuery(sql, categoryID);
};

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
        const data = await makeQuery(sql, categoryID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const modifyCategory = async (req, res, next) => {
    const {categoryID} = req.params;

    if (categoryID) {
        const data = await getProductFromDB(categoryID);
        if (data.length === 0) {
            return res.status(404).send('Category not found!');
        }
    }

    const {body} = req;


    const sql = `${!categoryID ? 'INSERT INTO' : 'UPDATE'} category SET ?
                    ${!categoryID ? '' : 'WHERE ID = ?'
    }`;

    try {
        const data = await makeQuery(sql, [body, categoryID]);
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

const deleteCategory = async (req, res, next) => {
    const {categoryID} = req.params;

    const data = await getProductFromDB(categoryID);
    if (data.length === 0) {
        return res.status(404).send('Category not found!');
    }

    const sql = `DELETE FROM category WHERE ID = ?`;
    try {
        const data = await makeQuery(sql, categoryID);
        res.status(202).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getCategoryByID, modifyCategory, deleteCategory};
