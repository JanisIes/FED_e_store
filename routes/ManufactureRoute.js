import express from 'express';
import indexAction from '../controllers/ManufactureController';

const router = express.Router();

router.get('/', indexAction);

export default router;
