import express from 'express';
import {indexAction, getUserByID, addNewUser} from '../controllers/UserController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:userID', getUserByID);
router.post('/', addNewUser);

export default router;
