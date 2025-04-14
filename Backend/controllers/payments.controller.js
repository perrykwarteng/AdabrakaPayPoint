import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const initiate = async (req, res) => {
  const { name, email, phone, amount, type, method, note } = req.body;

  try {
    const payStackPayment = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        metadata: {
          custom_fields: [
            { display_name: "Name", variable_name: "name", value: name },
            { display_name: "Phone", variable_name: "phone", value: phone },
            { display_name: "email", variable_name: "phone", value: email },
            { display_name: "Type", variable_name: "type", value: type },
            { display_name: "Note", variable_name: "note", value: note },
            { display_name: "Method", variable_name: "method", value: method },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (payStackPayment.data.status === true) {
      return res.json({
        status: "success",
        message: "Payment initialized successfully",
        data: payStackPayment.data,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: payStackPayment.data.message || "An error occurred",
      });
    }
  } catch (error) {
    console.error("Error initializing payment:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Payment initialization failed",
      error: error.message,
    });
  }
};
