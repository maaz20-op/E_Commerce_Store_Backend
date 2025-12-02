import { asyncHandler, errorResponseApi, successResponseApi } from '@maaz-jutt-utils/my-utils';
import Stripe from 'stripe';
import { OrderModel } from '../../models/orderModel.js';
import { AuthModel } from '../../models/authModel.js';
import { UserModel } from '../../models/UserModel.js';
import { sendEmailToAdminForNotifyOrder } from '../../emails/sendEmailToAdminForOrder.js';
import { notifyUserOnEmail } from '../../emails/notifyUserOnOrder.js';

export const createPaymentAndOrder = asyncHandler(async (req, res) => {
  const { payment, buyedProducts, transactionId } = req.body;

 const loggedInUserId = req.user?.id;
 const user = await UserModel.findOne({ userAuthId: loggedInUserId });
  if (!payment || !buyedProducts || !transactionId ||!loggedInUserId || !user) {
    return errorResponseApi(res, 470, "Data is missing")
  }
const authUser = await AuthModel.findById(loggedInUserId)
let buyedItems = []
buyedProducts.forEach((prod)=> {
 buyedItems.push(prod._id)
})

const order = await OrderModel.create({
    userId: user._id,
    authUserId: loggedInUserId,
    buyedItems,
    payment,
    transactionId,
    status: "Pending"
})


if(!order) return errorResponseApi(res, 450,"Can't create Order Error")
sendEmailToAdminForNotifyOrder(user?.name, payment)
notifyUserOnEmail(authUser.email, user.name, transactionId, payment)

  // User ko Stripe payment page ka URL bhejo
 successResponseApi(res, 200, "processing", order)
});

export const getAllOrdersToShowOnDashboard = asyncHandler(async (req, res) => {
    const allOrders = await OrderModel.find()
    .populate("userId")
    .populate("authUserId")
    .populate("buyedItems")

successResponseApi(res, 200, "orders fetched", allOrders);
})

export const confirmOrderAdmin = asyncHandler(async (req, res) => {
   const {orderId} = req.body;
  if(!orderId) return errorResponseApi(res, 455, "data is missing");
const order = await OrderModel.findById(orderId);
if(!order) return errorResponseApi(res, 455, "order not exists");
order.status = "Completed";
await order.save();
successResponseApi(res, 200, "order confirm successfully", order);
})