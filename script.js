// 🔹 Firebase configuration for your chat app
const firebaseConfig = {
  apiKey: "AIzaSyCmPDdKvfFVnh1yhlWoBobtl4GtuT4q-Qg",
  authDomain: "desire265-chat.firebaseapp.com",
  databaseURL: "https://desire265-chat-default-rtdb.firebaseio.com/",
  projectId: "desire265-chat"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Connect to Realtime Database
const database = firebase.database();
const messagesRef = database.ref("messages");

// Assign a unique temporary ID for this user/session
const userId = "user" + Math.floor(Math.random() * 1000);

// Function to send a message
function sendMessage() {
  const input = document.getElementById("messageInput");

  if (input.value.trim() !== "") {
    messagesRef.push({
      text: input.value,
      time: Date.now(),
      sender: userId // add sender info
    });
    input.value = ""; // clear input
  }
}

// Listen for new messages (live)
messagesRef.on("child_added", function(snapshot) {
  const data = snapshot.val();
  const messages = document.getElementById("chatBox");

  const msg = document.createElement("div");

  // Different style for your messages vs others
  if (data.sender === userId) {
    msg.className = "message me"; // green bubble = your message
  } else {
    msg.className = "message other"; // white bubble = other users
    msg.style.background = "#ffffff";
    msg.style.color = "#000000";
  }

  msg.innerText = data.text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight; // auto-scroll
});
