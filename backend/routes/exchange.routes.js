import express from 'express';
import { createExchange, updateExchange} from '../controllers/exchange.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Маршрут для создания предмета
router.post('/exchange', authenticateToken, createExchange);

router.put('/exchange/:id', authenticateToken, updateExchange)

export default router;