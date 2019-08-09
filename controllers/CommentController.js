import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('CommentController');

const indexAction = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const sql = 'SELECT * from comment';
        const data = await makeQuery(sql);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};


const getCommentByID = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);

    const {commentID} = req.params;

    try {
        const sql = 'SELECT * from comment WHERE ID = ?';
        const data = await makeQuery(sql, commentID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const addNewComment = async (req, res, next) => {
    const {body} = req;

    const sql = `INSERT INTO comment set ?`;
    try {
        const data = await makeQuery(sql, body);
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

const deleteComment = async (req, res, next) => {
    const {commentID} = req.params;

    const data = await getProductFromDB(commentID);
    if (data.length === 0) {
        return res.status(404).send('Page not found!');
    }

    const sql = `DELETE FROM comment WHERE ID = ?`;
    try {
        await makeQuery(sql, commentID);
        res.status(200).send('Comment deleted!');
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getCommentByID, addNewComment};
