import express from 'express';
import indexAction from '../controllers/CommentController';

const router = express.Router();

router.get('/', indexAction);

export default router;
