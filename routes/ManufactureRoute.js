import express from 'express';
import {indexAction, getManufactureByID, modifyManufacturer, deleteManufacturer} from '../controllers/ManufactureController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:manufactureID', getManufactureByID);
router.post('/', modifyManufacturer);
router.put('/:manufactureID', modifyManufacturer);
router.delete('/:manufactureID', deleteManufacturer);


export default router;
