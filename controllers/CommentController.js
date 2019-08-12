import AppError from '../errors/AppError';
import makeQuery from "../service/MysqlConnection";

const logger = require('../utils/logger')('CommentController');

const getProductFromDB = (commentID) => {
    const sql = 'SELECT * from comment WHERE ID = ?';
    return makeQuery(sql, commentID);
};

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

const modifyComment = async (req, res, next) => {
    const {commentID} = req.params;

    if (commentID) {
        const data = await getProductFromDB(commentID);
        if (data.length === 0) {
            return res.status(404).send('Comment not found!');
        }
    }

    const {body} = req;

    const sql = `${!commentID ? 'INSERT INTO' : 'UPDATE'} comment SET ?
                    ${!commentID ? '' : 'WHERE ID = ?'
    }`;

    try {
        const data = await makeQuery(sql, [body, commentID]);
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
        const data = await makeQuery(sql, commentID);
        res.status(202).send(data);
    } catch (error) {
        next(new AppError(error.message, 400));
    }

};

export {indexAction, getCommentByID, modifyComment, deleteComment};
