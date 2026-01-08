// src/lib/emailService.js
// Email service integration using EmailJS (No backend setup required)

export const initEmailJS = () => {
  // Initialize EmailJS with your public key
  // Get your public key from: https://dashboard.emailjs.com/admin/account
  if (window.emailjs) {
    window.emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your actual public key
  }
};

// Send contact form email
export const sendContactEmail = async (formData) => {
  try {
    if (!window.emailjs) {
      console.error("EmailJS not initialized. Using fallback...");
      return simulateEmailSend(formData);
    }

    const response = await window.emailjs.send(
      "SERVICE_ID", // Replace with your EmailJS service ID
      "CONTACT_TEMPLATE_ID", // Replace with your EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "your-email@example.com", // Your email
      }
    );

    console.log("Email sent successfully:", response);
    return { success: true, message: "Message sent! We'll reply within 24 hours." };
  } catch (error) {
    console.error("Email send failed:", error);
    return { 
      success: false, 
      message: "Failed to send email. Please try again or contact directly." 
    };
  }
};

// Send cart/order email
export const sendOrderEmail = async (orderData) => {
  try {
    if (!window.emailjs) {
      console.error("EmailJS not initialized. Using fallback...");
      return simulateEmailSend(orderData);
    }

    const itemsList = orderData.items
      .map(item => `- ${item.title}: ₹${Math.floor(item.finalPrice).toLocaleString()}`)
      .join("\n");

    const response = await window.emailjs.send(
      "SERVICE_ID", // Replace with your EmailJS service ID
      "ORDER_TEMPLATE_ID", // Replace with your EmailJS template ID
      {
        customer_name: orderData.name,
        customer_email: orderData.email,
        customer_phone: orderData.phone,
        order_items: itemsList,
        total_price: `₹${Math.floor(orderData.total).toLocaleString()}`,
        requirements: orderData.requirements,
        to_email: "your-email@example.com", // Your email
      }
    );

    console.log("Order email sent successfully:", response);
    return { 
      success: true, 
      message: "Order confirmation sent! We'll contact you shortly." 
    };
  } catch (error) {
    console.error("Email send failed:", error);
    return { 
      success: false, 
      message: "Order submitted locally. We'll contact you shortly." 
    };
  }
};

// Fallback: Log to console (for development without EmailJS setup)
const simulateEmailSend = (data) => {
  console.log("📧 Email Data (Logged locally - EmailJS not configured):", data);
  
  // You can also send to a backend API here
  // Example: POST to your own backend
  // fetch('/api/send-email', { method: 'POST', body: JSON.stringify(data) })
  
  return { 
    success: true, 
    message: "Message received! We'll get back to you soon." 
  };
};
