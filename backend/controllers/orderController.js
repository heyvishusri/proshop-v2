import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { calculateOrderPrices } from "../utils/calcPrices.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // Fetch products from database to get current prices
  const itemsFromDB = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item._id);
      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${item._id}`);
      }
      return {
        name: product.name,
        qty: item.qty,
        image: product.image,
        price: product.price,
        product: item._id
      };
    })
  );

  // Calculate prices on server-side
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderPrices(itemsFromDB);

  const order = new Order({
    orderItems: itemsFromDB,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Prevent reused transaction IDs - check if order is already paid
  if (order.isPaid) {
    res.status(400);
    throw new Error("Order is already paid");
  }

  // Check if transaction ID was already used in another order
  const existingOrder = await Order.findOne({
    "paymentResult.id": req.body.id,
    _id: { $ne: order._id }
  });

  if (existingOrder) {
    res.status(400);
    throw new Error("Transaction ID already used");
  }

  // Verify PayPal payment
  const { verifyPayPalPayment } = await import("../utils/paypal.js");
  const isValidPayment = await verifyPayPalPayment(req.body.id, req.body);

  if (!isValidPayment) {
    res.status(400);
    throw new Error("Invalid PayPal payment verification");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer?.email_address
  };

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  // res.json(orders);
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
};
