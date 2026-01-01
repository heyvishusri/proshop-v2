import axios from "axios";

// Verify PayPal payment using PayPal Orders API
export const verifyPayPalPayment = async (paymentId, details) => {
  try {
    // If PayPal credentials are not configured, skip verification in development
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      console.warn("PayPal credentials not configured, skipping verification");
      // In development, allow if NODE_ENV is development, otherwise reject
      return process.env.NODE_ENV === "development";
    }

    // Get PayPal access token
    const baseURL = process.env.PAYPAL_ENV === "production"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

    const authResponse = await axios.post(
      `${baseURL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_CLIENT_SECRET
        }
      }
    );

    const accessToken = authResponse.data.access_token;

    // Verify the payment using PayPal Orders API
    // paymentId (details.id) is the PayPal order ID
    const orderId = paymentId || details?.id;
    if (!orderId) {
      return false;
    }

    const verifyResponse = await axios.get(
      `${baseURL}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    const order = verifyResponse.data;

    // Check if order status is COMPLETED
    if (order.status !== "COMPLETED") {
      return false;
    }

    // Verify that there is at least one capture and it's COMPLETED
    const captures = order.purchase_units[0]?.payments?.captures || [];
    if (captures.length === 0) {
      return false;
    }

    const capture = captures[0];
    if (capture.status !== "COMPLETED") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("PayPal verification error:", error.response?.data || error.message);
    return false;
  }
};

