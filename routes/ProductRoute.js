import express from 'express';
import indexAction from '../controllers/ProductController';

const router = express.Router();

router.get('/', indexAction);

export default router;
