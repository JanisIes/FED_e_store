import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const logger = require('../utils/logger')('UserController');

const getProductFromDB = userID => {
  const sql = 'SELECT * from users WHERE ID = ?';
  return makeQuery(sql, userID);
};

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
  const { userID } = req.params;

  try {
    const sql = 'SELECT * from users WHERE ID = ?';
    const data = await makeQuery(sql, userID);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const modifyUser = async (req, res, next) => {
  const { userID } = req.params;

  if (userID) {
    const data = await getProductFromDB(userID);
    if (data.length === 0) {
      return res.status(404).send('User not found!');
    }
  }

  const { body } = req;

  const sql = `${!userID ? 'INSERT INTO' : 'UPDATE'} users SET ?
                    ${!userID ? '' : 'WHERE ID = ?'}`;

  try {
    const data = await makeQuery(sql, [body, userID]);
    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  const { userID } = req.params;

  const data = await getProductFromDB(userID);
  if (data.length === 0) {
    return res.status(404).send('User not found!');
  }

  const sql = `DELETE FROM users WHERE ID = ?`;
  try {
    const data = await makeQuery(sql, userID);
    res.status(202).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};


const createUser = (req, res, next) => {
    if (req.body.email !== req.body.emailConfirmation) {
      next(new AppError('Email not the same', 400));
    }
  
    req.body.createdAt = new Date();
  
    res.status(201).send(req.body);
  }; 


export { indexAction, getUserByID, createUser, deleteUser };
