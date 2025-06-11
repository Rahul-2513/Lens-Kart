import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "You can place an order by browsing our collection, selecting your desired products, adding them to the cart, and proceeding to checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards, and digital wallets like PhonePay,Google Pay and Paytm .",
  },
  {
    question: "How long does shipping take?",
    answer:
      "We offer instant delivery within 1-2 hours. However, if your location is beyond our delivery range, it may take at least 3-4 hours.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Since we deliver directly to your location, please check the product at your doorstep upon arrival. We do not accept returns or complaints after delivery is completed.",
  },
  {
    question: "How much is the delivery fee?",
    answer:
      "If your delivery location is within 5 km of our shop, there is no delivery fee. Beyond this range, charges apply based on the distance.",
  },
];


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };  

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Frequently Asked Questions
      </h1>


      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300"
          >
            <button
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <FaMinus className="text-red-500" />
              ) : (
                <FaPlus className="text-green-500" />
              )}
            </button>
            {openIndex === index && (
              <p className="text-gray-600 mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
