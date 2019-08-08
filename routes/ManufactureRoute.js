import express from 'express';
import {indexAction, getManufactureByID} from '../controllers/ManufactureController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:manufactureID', getManufactureByID);

export default router;
