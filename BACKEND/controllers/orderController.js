

import orderModel  from '../models/orderModels.js' 
import userModel from '../models/userModels.js';
 
import Stripe from 'stripe'
import razorpay from 'razorpay'

const currency = 'inr'
const deliveryCharges = 100

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const placeOrder = async (req,res) =>{
   try {
    const userId = req.userId;

     const { items, amount, address} = req.body;
     const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod:"COD",
      payment:false,
      date:Date.now()

     }

     const newOrder = new orderModel(orderData)
     await newOrder.save()
     await userModel.findByIdAndUpdate(userId,{cartData:{}})
     res.json({success:true,message:"Order Placed"})
   } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
   }
}

const placeOrderStripe = async (req, res) => {
    try {
      const userId = req.userId;

      const { items, amount, address } = req.body;

      const {origin} = req.headers;
      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "Stripe",
        payment: false,
        date: Date.now(),
      };

      
     const newOrder = new orderModel(orderData);
     await newOrder.save();
    
     const line_items = items.map((item) => ({
       price_data: {
         currency: currency,
         product_data: {
           name: item.name,
         },
         unit_amount: item.price * 100,
       },
       quantity: item.quantity,
     }));

     line_items.push({
       price_data: {
         currency: currency,
         product_data: {
           name: "Delivery Charges",
         },
         unit_amount: deliveryCharges * 100,
       },
       quantity: 1,
     });

     const session = await stripe.checkout.sessions.create({
       success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
       cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
       line_items,
       mode: "payment",
     });
    

     res.json({ success: true, session_url :session.url });

    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
};

const verifyStripe = async (req, res) => {
  const { orderId, success } = req.body; // ← read from body

  try {
    if (success === "true") {
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      // mark paid & clear cart
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

      // return JSON, don’t redirect
      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({
        success: false,
        message: "Payment was not completed",
      });
    }
  } catch (error) {
    console.error("Verify Stripe Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during verification" });
  }
};



const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    // Save order in DB first
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Razorpay expects amount in paisa (₹1 = 100)
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    // Proper async/await usage
    const razorpayOrder = await razorpayInstance.orders.create(options);

    if (!razorpayOrder || !razorpayOrder.id) {
      throw new Error("Failed to create Razorpay order");
    }

    res.json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    const { razorpay_order_id } = req.body;

    if (!razorpay_order_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Razorpay Order ID" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      // ✅ Send proper response
      res.json({
        success: true,
        message:"Payment Successful"
      });
    }
    else{
      // ✅ Send proper response
      res.json({
        success: false,
        message: "Payment Failed" ,
      });
    }

   
  } catch (error) {
    console.error("Verify Razorpay Error:", error);

    // ✅ Also send response on error
    res.status(500).json({
      success: false,
      message: "Server error while verifying order",
    });
  }
};


const allOrders = async (req, res) => {
   try {
      const orders = await orderModel.find({})
      res.json({success:true,orders})
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
   }
};

const userOrders = async (req, res) => {
   try {
      const userId = req.userId;
      const orders = await orderModel.find({userId})
      res.json({ success: true,orders});
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
   }
};

const updateStatus = async (req, res) => {
   try {
      const {orderId ,status} = req.body
      await orderModel.findByIdAndUpdate(orderId,{status})
      res.json({success:true,message:"Status Updated"})
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
   }
};

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe,verifyRazorpay}