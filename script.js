document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("bg-blue-600", "text-white"));
            this.classList.add("bg-blue-600", "text-white");

            // Show/Hide Portfolio Items
            portfolioItems.forEach(item => {
                if (filter === "all" || item.getAttribute("data-category") === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});
    document.addEventListener("DOMContentLoaded", function () {
    const testimonials = [
        { text: '"This company transformed our business with their AI solutions. Highly recommended!"', author: "- John Doe, CEO of TechCorp" },
        { text: '"Their cloud solutions saved us thousands of dollars. Amazing work!"', author: "- Jane Smith, CTO of CloudNet" },
        { text: '"Fast, reliable, and efficient – everything we needed for our web development!"', author: "- Mike Johnson, Founder of StartupX" }
    ];

    let index = 0;
    const testimonialElement = document.getElementById("testimonial-slider");

    function updateTestimonial() {
        testimonialElement.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg text-center transition transform">
                <p class="text-gray-600 italic">${testimonials[index].text}</p>
                <h3 class="text-lg font-semibold mt-4">${testimonials[index].author}</h3>
            </div>
        `;
        index = (index + 1) % testimonials.length;
    }

    setInterval(updateTestimonial, 5000); // Change testimonial every 5 seconds
});
function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Name Validation (Not empty and at least 2 characters)
    if (name.trim() === '' || name.length < 2) {
        alert("Please enter a valid name.");
        return false;
    }

    // Email Validation (Basic pattern check)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Message Validation (Not empty)
    if (message.trim() === '') {
        alert("Please enter a message.");
        return false;
    }

    // If all validations pass, submit the form
    alert("Form submitted successfully!");
    document.getElementById('contact-form').submit();
}
    const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;
// API configuration
const API_KEY = "AIzaSyCgMCFRpYqkBQ2PaEtkUoRH5UdaX6J3UsA"; // Your API key here
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const createChatLi = (message, className) => {
// Create a chat <li> element with passed message and className
const chatLi = document.createElement("li");
chatLi.classList.add("chat", `${className}`);
let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
chatLi.innerHTML = chatContent;
chatLi.querySelector("p").textContent = message;
return chatLi; // return chat <li> element
}
const generateResponse = async (chatElement) => {
const messageElement = chatElement.querySelector("p");
// Define the properties and message for the API request
const requestOptions = {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ 
  contents: [{ 
    role: "user", 
    parts: [{ text: userMessage }] 
  }] 
}),
}
// Send POST request to API, get response and set the reponse as paragraph text
try {
const response = await fetch(API_URL, requestOptions);
const data = await response.json();
if (!response.ok) throw new Error(data.error.message);

// Get the API response text and update the message element
messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
} catch (error) {
// Handle error
messageElement.classList.add("error");
messageElement.textContent = error.message;
} finally {
chatbox.scrollTo(0, chatbox.scrollHeight);
}
}
const handleChat = () => {
userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
if (!userMessage) return;
// Clear the input textarea and set its height to default
chatInput.value = "";
chatInput.style.height = `${inputInitHeight}px`;
// Append the user's message to the chatbox
chatbox.appendChild(createChatLi(userMessage, "outgoing"));
chatbox.scrollTo(0, chatbox.scrollHeight);
setTimeout(() => {
// Display "Thinking..." message while waiting for the response
const incomingChatLi = createChatLi("Thinking...", "incoming");
chatbox.appendChild(incomingChatLi);
chatbox.scrollTo(0, chatbox.scrollHeight);
generateResponse(incomingChatLi);
}, 600);
}
chatInput.addEventListener("input", () => {
// Adjust the height of the input textarea based on its content
chatInput.style.height = `${inputInitHeight}px`;
chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
// If Enter key is pressed without Shift key and the window 
// width is greater than 800px, handle the chat
if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
e.preventDefault();
handleChat();
}
});
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));