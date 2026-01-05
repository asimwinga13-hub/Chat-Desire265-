// Firebase configuration
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

// Send message
function sendMessage() {
  const input = document.getElementById("messageInput");

  if (input.value.trim() !== "") {
    messagesRef.push({
      text: input.value,
      time: Date.now()
    });
    input.value = "";
  }
}

// Receive messages
messagesRef.on("child_added", function(snapshot) {
  const messages = document.getElementById("chatBox");

  const msg = document.createElement("div");
  msg.className = "message me";
  msg.innerText = snapshot.val().text;

  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
});
