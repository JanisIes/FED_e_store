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
        const data = await makeQuery(sql, req.params.commentID);
        res.json(data);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

const addNewComment = async (req, res, next) => {
    const {body} = req;
    const {
        title,
        text,
        product_id,
        user_id,
    } = body;

    const sql = `INSERT INTO comment set ?`;
    try {
        const data = await makeQuery(sql, {
            title,
            text,
            product_id,
            user_id,
        });
        res.status(201).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};


export {indexAction, getCommentByID, addNewComment};
