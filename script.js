// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ChatGPT link updater
document.getElementById('chat-link').addEventListener('click', function(e){
  e.preventDefault();
  alert('To update the ChatGPT link, replace the href in #chat-link with your ChatGPT URL.');
});

// Interactive ChatGPT chat
async function sendPrompt() {
  const prompt = document.getElementById("userPrompt").value;
  const responseEl = document.getElementById("response");

  if (!prompt) {
    responseEl.innerText = "Please type a question first.";
    return;
  }

  responseEl.innerText = "Loading...";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "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" // replace with your API key or use a backend proxy
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    responseEl.innerText = data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    responseEl.innerText = "Error: Could not get response. Check console.";
  }
}