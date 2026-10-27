const { createClient } = supabase;

const PROJECT_URL = `https://cztpfkxwatztwbbpgmor.supabase.co`;
const ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dHBma3h3YXR6dHdiYnBnbW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMDQ0ODUsImV4cCI6MjEwODY4MDQ4NX0.2hnilbMrr7eSr3cZ5LuYU4NXC4RhDcrR9QwOjGKLvvk`;

const dataBase = createClient(
    PROJECT_URL,
    ANON_KEY
)


const form = document.getElementById("chat-form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message-input");
const messages = document.getElementById("messages");
const showStatus = document.getElementById("showStatus");

let seenID = new Set();

const dispalyMessage = (message) => {

    if (seenID.has(message.id)) return;
    seenID.add(message.id);

    let item = document.createElement("div");
    item.className = "message";

    let name = document.createElement("strong")
    name.textContent = message.username;

    let content = document.createElement("div")
    content.textContent = message.content;

    let time = document.createElement("small")
    time.textContent = new Date(
        message.created_at
    ).toLocaleString();

    item.append(name, content, time);
    messages.appendChild(item)

}

const loadMessages = async () => {
    showStatus.textContent = "Messages load ho rhe hain..."

    const { data, error } = await dataBase
        .from("messages")
        .select("*")
        .order("created_at", { accending: true })
        .limit(100);

    if (error) {
        showStatus.textContent = "Error: " + error.message;
        return;
    }

    data.forEach(dispalyMessage);
    showStatus.textContent = "Chat connected";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
})

const username = usernameInput.value.trim();
const content = messageInput.value.trim();

