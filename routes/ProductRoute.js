import express from 'express';
import {indexAction, getProductByID, modifyProduct, deleteProduct} from '../controllers/ProductController';


const router = express.Router();

router.get('/', indexAction);
router.get('/:productID', getProductByID);
router.post('/', modifyProduct);
router.put('/:productID', modifyProduct);
router.delete('/:productID', deleteProduct);

export default router;
