import express from 'express';
import {indexAction, getOrderByID, modifyOrder, deleteOrder} from '../controllers/OrderController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:orderID', getOrderByID);
router.post('/', modifyOrder);
router.put('/:orderID', modifyOrder);
router.delete('/:orderID', deleteOrder);

export default router;
