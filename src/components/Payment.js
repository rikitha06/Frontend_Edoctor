import React, { useState } from "react";
import axios from "../services/api"; // Axios instance
import "../CSS/PaymentMethod.css";

const PaymentMethod = ({ appointmentId }) => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    try {
      // Make a POST request to the backend
      const response = await axios.post("/patient/Payment", {
        appointmentId,
        amount,
      });

      // If response is successful, proceed to open Razorpay checkout
      const { paymentId, amount: backendAmount } = response.data; // Backend response

      const options = {
        key: "rzp_test_A3WY0WOJLejK3e", // Replace with Razorpay Key ID
        amount: backendAmount * 100, // Amount in paise
        currency: "INR",
        name: "E-Doctor",
        description: "Payment for Appointment",
        order_id: paymentId, // Razorpay order ID from backend
        handler: async function (response) {
          // Handle payment success
          alert("Payment successful!");
          console.log("Razorpay Payment ID:", response.razorpay_payment_id);
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Error processing payment.");
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="payment-container">
      <h3>Payment</h3>
      <p>Make payment for Appointment ID: {appointmentId}</p>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default PaymentMethod;
