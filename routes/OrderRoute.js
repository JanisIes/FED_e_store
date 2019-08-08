import express from 'express';
import {indexAction, getOrderByID, addNewOrder} from '../controllers/OrderController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:orderID', getOrderByID);
router.post('/', addNewOrder);

export default router;
