import express from 'express';
import {indexAction, getCommentByID, modifyComment, deleteComment} from '../controllers/CommentController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:commentID', getCommentByID);
router.post('/', modifyComment);
router.put('/:commentID', modifyComment);
router.delete('/:commentID', deleteComment);


export default router;
