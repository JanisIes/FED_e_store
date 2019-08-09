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

const addNewCategory = async (req, res, next) => {
    const {body} = req;


    const sql = `INSERT INTO category set ?`;
    try {
        const data = await makeQuery(sql, body);
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

const deleteCategory = async (req, res, next) => {
    const {categoryID} = req.params;

    const data = await getProductFromDB(categoryID);
    if (data.length === 0) {
        return res.status(404).send('Page not found!');
    }

    const sql = `DELETE FROM category WHERE ID = ?`;
    try {
        await makeQuery(sql, categoryID);
        res.status(200).send('Category deleted!');
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getCategoryByID, addNewCategory, deleteCategory};
