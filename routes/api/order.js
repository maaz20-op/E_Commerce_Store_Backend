import express from "express";
const router = express.Router();
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import {createPaymentAndOrder, getAllOrdersToShowOnDashboard, confirmOrderAdmin} from '../../controllers/api/orderController.js'

router.post('/', isLoggedIn, createPaymentAndOrder)
router.get('/', isLoggedIn, getAllOrdersToShowOnDashboard)
router.patch('/', isLoggedIn, confirmOrderAdmin)

export default router;
