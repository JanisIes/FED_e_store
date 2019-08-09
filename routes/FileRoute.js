import express from 'express';
import {saveFile} from '../controllers/FileController';


const router = express.Router();

router.post('/', saveFile);


export default router;
