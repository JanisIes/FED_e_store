import express from 'express';
import {indexAction, getCategoryByID, addNewCategory, deleteCategory} from '../controllers/CategoryController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:categoryID', getCategoryByID);
router.post('/', addNewCategory);
router.delete('/:categoryID', deleteCategory);

export default router;
