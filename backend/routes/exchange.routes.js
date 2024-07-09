import express from 'express';
import { createExchange, updateExchange, deleteExchange, getMyCreatedExchanges, getExchangesForMe, createSolutionToExchange } from '../controllers/exchange.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Маршрут для создания предмета
router.post('/exchange', authenticateToken, createExchange);

router.put('/exchange/:id', authenticateToken, updateExchange)

router.delete('/exchange/:id', authenticateToken, deleteExchange)

router.get('/my-exchanges', authenticateToken, getMyCreatedExchanges)

router.get('/exchanges-for-me', authenticateToken, getExchangesForMe)

router.post('/exchange-decide/:id', authenticateToken, createSolutionToExchange)

export default router;