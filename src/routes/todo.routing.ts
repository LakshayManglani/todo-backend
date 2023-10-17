import { Router } from 'express';
import { getAllTodos } from '../controllers/todo.controller';

const router = Router();

router.route('/').get(getAllTodos);

export default router;
