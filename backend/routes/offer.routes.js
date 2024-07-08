import express from 'express';
import { createOffer, getOffers, getOffersByUser, myOffers, updateOffer, deleteOffer } from '../controllers/offer.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { offerCreateValidator, offerUpdateValidator } from '../validators/offerValidators.js';

const router = express.Router();

// Маршрут для создания предмета
router.post('/offer', authenticateToken, offerCreateValidator, createOffer);

router.get('/offer', getOffers)

router.get('/offer/:user_id', getOffersByUser)

router.get('/my-offer', authenticateToken, myOffers)

router.put('/offer/:id', authenticateToken, offerUpdateValidator, updateOffer)

router.delete('/offer/:id', authenticateToken, deleteOffer)

export default router;