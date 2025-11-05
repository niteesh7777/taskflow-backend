import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../../controllers/task.controller.js';
import authUser from '../../middlewares/authentication.middleware.js';
import restrictTo from '../../middlewares/restrictTo.middleware.js';

const router = express.Router();

router.use(authUser);

router.post('/', createTask);

router.get('/', getTasks);

router.get('/admin/all', restrictTo('admin'), getTasks);

router.get('/:id', getTaskById);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;

// import express from 'express';

// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('task working fine bro');
// });

// export default router;
