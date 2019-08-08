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

export {indexAction, getCommentByID};
