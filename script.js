// 🔹 Firebase configuration (replace with your Firebase values)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Connect to database
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
