import express from 'express';
import {indexAction, getManufactureByID, addNewManufacturer} from '../controllers/ManufactureController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:manufactureID', getManufactureByID);
router.post('/', addNewManufacturer);

export default router;
