import { Router, type Request, type Response } from 'express';
import BookController from '../controller/bookcontroller.js';
import UserController from '../controller/userController.js';
import {
  googleCallback,
  logoutUser,
  redirectToGoogle,
  verifyUser,
} from '../auth/auth.js';
import { authenticateUser } from '../middleware/authenticateUser.js';
import dashboardController from '../controller/dashboardController.js';

const router = Router();
const bookController = new BookController();

// Book
router.get('/get-book', authenticateUser, (req: Request, res: Response) =>
  bookController.getBookDetails(req, res)
);
router.post('/add-book', authenticateUser, (req: Request, res: Response) =>
  bookController.createBookDetails(req, res)
);
router.put('/update-book', authenticateUser, (req: Request, res: Response) =>
  bookController.updateBookDetails(req, res)
);
router.delete('/delete-book', authenticateUser, (req: Request, res: Response) =>
  bookController.deleteBookDetails(req, res)
);
router.get('/books', authenticateUser, (req: Request, res: Response) =>
  bookController.filterBookController(req, res)
);
router.get('/dashboard', authenticateUser, (req: Request, res: Response) =>
  dashboardController.getDashboardDetails(req, res)
);

// Auth
router.get('/auth/google', (req: Request, res: Response) =>
  redirectToGoogle(req, res)
);
router.get('/auth/google/callback', (req: Request, res: Response) =>
  googleCallback(req, res)
);

router.get('/auth/me', (req: Request, res: Response) => verifyUser(req, res));

router.post('/auth/logout', (req: Request, res: Response) =>
  logoutUser(req, res)
);

export default router;
