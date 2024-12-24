import React, { useState } from "react";
import "../CSS/Chatbot.css"; // Ensure CSS is applied correctly
import { FiMessageSquare, FiX } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi"; // For the up arrow icon

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Predefined question-answer mapping
  const qaMapping = {
    "hello": "Hi there! How can I assist you with your doctor appointment today?",
    "what is an online doctor appointment": "An online doctor appointment allows you to consult with a healthcare professional remotely via video, phone, or text.",
    "how do i book an appointment": "You can book an appointment by providing your details, choosing a doctor, and selecting a time slot through our platform.",
    "can i cancel my appointment": "Yes, you can cancel your appointment anytime before the scheduled time. Please visit your appointment details page to cancel.",
    "how do i reschedule my appointment": "To reschedule, go to your appointment details and select the option to change the date or time of your appointment.",
    "how do i pay for the appointment": "You can pay for your appointment using credit/debit cards, net banking, or other online payment methods available on our platform.",
    "what if i miss my appointment": "If you miss your appointment, please contact our support team to reschedule or discuss the next steps.",
    "can i choose a specific doctor": "Yes, you can choose from a list of available doctors in your area based on specialty, availability, and ratings.",
    "what specialties do you offer": "We offer consultations in various specialties, including general medicine, dermatology, psychiatry, gynecology, pediatrics, and more.",
    "how do i find a doctor": "You can search for doctors by specialty, location, or name using the search feature on our platform.",
    "is my information secure": "Yes, your information is securely stored and processed using encryption and compliance with privacy regulations to ensure confidentiality.",
    "how do i contact customer support": "You can contact our customer support via email, phone, or chat available on the platform.",
    "bye": "Goodbye! Have a great day!"
  };

  // Normalize a string to match keys in the qaMapping
  const normalizeInput = (str) => {
    return str.trim().toLowerCase().replace(/[^\w\s]/gi, "");
  };

  // Handle sending a message
  const handleSend = () => {
    if (input.trim() === "") return;

    const normalizedMessage = normalizeInput(input);
    const botResponse = qaMapping[normalizedMessage] || "Sorry, I don't have an answer for that.";

    // Update messages with user's message and bot's response
    setMessages([...messages, { type: "user", text: input }, { type: "bot", text: botResponse }]);
    setInput(""); // Clear input field
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>Chatbot</h3>
          <button onClick={() => setIsOpen(false)}>
            <FiX />
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>
            <FiArrowUp />
          </button>
        </div>
      </div>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <FiMessageSquare />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
