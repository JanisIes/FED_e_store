import express from 'express';
import indexAction from '../controllers/OrderController';

const router = express.Router();

router.get('/', indexAction);

export default router;
