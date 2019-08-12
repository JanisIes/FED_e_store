import express from 'express';
import {indexAction, getUserByID, deleteUser, createUser} from '../controllers/UserController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:userID', getUserByID);
router.post('/', createUser);
//router.put('/:userID', modifyUser);
router.delete('/:userID', deleteUser);

export default router;
