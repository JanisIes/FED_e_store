import express from 'express';
import {indexAction, getOrderByID} from '../controllers/OrderController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:orderID', getOrderByID);

export default router;
