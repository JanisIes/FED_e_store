import express from 'express';
import {indexAction, getProductByID, addNewProduct} from '../controllers/ProductController';


const router = express.Router();

router.get('/', indexAction);
router.get('/:productID', getProductByID);
router.post('/', addNewProduct);

export default router;
