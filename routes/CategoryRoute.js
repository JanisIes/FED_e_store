import express from 'express';
import {indexAction, getCategoryByID, deleteCategory, modifyCategory} from '../controllers/CategoryController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:categoryID', getCategoryByID);
router.post('/', modifyCategory);
router.put('/:categoryID', modifyCategory);
router.delete('/:categoryID', deleteCategory);

export default router;
