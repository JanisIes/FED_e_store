import express from 'express';
import {indexAction, getCommentByID, addNewComment} from '../controllers/CommentController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:commentID', getCommentByID);
router.post('/', addNewComment);

export default router;
