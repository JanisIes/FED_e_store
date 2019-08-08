import express from 'express';
import {indexAction, getCategoryByID} from '../controllers/CategoryController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:categoryID', getCategoryByID);

export default router;
