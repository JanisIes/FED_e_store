import express from 'express';
import {indexAction, getUserByID} from '../controllers/UserController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:userID', getUserByID);

export default router;
