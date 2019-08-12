import express from 'express';
import {indexAction, getUserByID, modifyUser, deleteUser} from '../controllers/UserController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:userID', getUserByID);
router.post('/', modifyUser);
router.put('/:userID', modifyUser);
router.delete('/:userID', deleteUser);

export default router;
