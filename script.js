const inputField = document.getElementById("chatbot-input-field");
const sendButton = document.getElementById("chatbot-send-button");
const messagesList = document.getElementById("chatbot-messages");

// Connect to the WebSocket server
const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", function(event) {
  console.log("Connected to WebSocket server");
});

socket.addEventListener("message", function(event) {
  const chatbotMessage = createMessage("Chatbot", event.data);
  messagesList.appendChild(chatbotMessage);
});

sendButton.addEventListener("click", function() {
  const message = inputField.value;
  inputField.value = "";
  const userMessage = createMessage("You", message);
  messagesList.appendChild(userMessage);

  // Send the message to the WebSocket server
  socket.send(message);
});

function createMessage(sender, text) {
  const messageItem = document.createElement("li");
  messageItem.innerHTML = `<b>${sender}:</b> ${text}`;
  return messageItem;
}
