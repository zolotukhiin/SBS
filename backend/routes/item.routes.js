import express from 'express';
import { createItem, updateItem, deleteItem, myItems, otherUserItems, getItems, getItemById } from '../controllers/item.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { validateItemCreate, validateItemUpdate } from '../validators/itemValidator.js';

const router = express.Router();

// Маршрут для создания предмета
router.post('/items', authenticateToken, validateItemCreate, createItem);

// updt
router.put('/items/:id', authenticateToken, validateItemUpdate, updateItem)

// delete
router.delete('/items/:id', authenticateToken, deleteItem)

// my items
router.get('/my-items', authenticateToken, myItems)

// other user items
router.get('/items/users/:id', authenticateToken, otherUserItems)

// all items
router.get('/items', authenticateToken, getItems)

// get item by id 
router.get('/items/:id', authenticateToken, getItemById)

export default router;