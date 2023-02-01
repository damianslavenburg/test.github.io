const inputField = document.getElementById("chatbot-input-field");
const sendButton = document.getElementById("chatbot-send-button");
const messagesList = document.getElementById("chatbot-messages");

sendButton.addEventListener("click", function() {
  const message = inputField.value;
  inputField.value = "";
  const userMessage = createMessage("You", message);
  messagesList.appendChild(userMessage);

  // Send the message to the server-side script for processing
  fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  })
    .then(response => response.json())
    .then(response => {
      const chatbotMessage = createMessage("Chatbot", response.message);
      messagesList.appendChild(chatbotMessage);
    });
});

function createMessage(sender, text) {
  const messageItem = document.createElement("li");
  messageItem.innerHTML = `<b>${sender}:</b> ${text}`;
  return messageItem;
}
