import express from 'express';
import {indexAction, getCommentByID} from '../controllers/CommentController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:commentID', getCommentByID);

export default router;
