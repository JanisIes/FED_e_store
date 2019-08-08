import express from 'express';
import {indexAction, getCategoryByID, addNewCategory} from '../controllers/CategoryController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:categoryID', getCategoryByID);
router.post('/', addNewCategory);

export default router;
