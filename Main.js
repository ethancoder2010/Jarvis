// =========================================
// JARVIS AI ASSISTANT WEB APP
// GITHUB + RENDER/VERCEL COMPATIBLE
// =========================================
// FEATURES:
// - Voice Assistant
// - OpenAI Chat
// - Text To Speech
// - Weather Reports
// - Open Websites
// - Time + Date
// =========================================

// dotenv removed for mobile compatibility

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Console input removed for web app
// Browser launch removed for deployment compatibility
const axios = require('axios');
// Text-to-speech removed for mobile compatibility
const moment = require('moment');
const { OpenAI } = require('openai');

// =========================================
// CONFIG
// =========================================

const WEATHER_API_KEY = 'PASTE_YOUR_WEATHER_API_KEY_HERE';
const OPENAI_API_KEY = 'PASTE_YOUR_OPENAI_API_KEY_HERE';
const CITY = 'New York';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// =========================================
// TEXT TO SPEECH
// =========================================

function speak(text) {
  console.log(`
Jarvis: ${text}
`);
}

// =========================================
// WEATHER
// =========================================

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);

    const temp = response.data.main.temp;
    const description = response.data.weather[0].description;

    return `The temperature in ${CITY} is ${temp} degrees Celsius with ${description}.`;
  } catch (error) {
    return 'Unable to fetch weather data.';
  }
}

// =========================================
// OPENAI CHAT
// =========================================

async function askAI(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are Jarvis, a futuristic AI assistant inspired by Iron Man. Respond intelligently and professionally.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    return `AI Error: ${error.message}`;
  }
}

// =========================================
// COMMAND HANDLER
// =========================================

async function handleCommand(command) {
  command = command.toLowerCase();
  command = command.toLowerCase();

  if (command.includes('time')) {
    const currentTime = moment().format('hh:mm A');
    speak(`The current time is ${currentTime}`);
  }

  else if (command.includes('date')) {
    const currentDate = moment().format('MMMM Do YYYY');
    speak(`Today is ${currentDate}`);
  }

  else if (command.includes('open youtube')) {
    speak('Opening YouTube');
    await open('https://youtube.com');
  }

  else if (command.includes('open google')) {
    speak('Opening Google');
    await open('https://google.com');
  }

  else if (command.includes('weather')) {
    const weather = await getWeather();
    speak(weather);
  }

  else if (command.includes('shutdown')) {
    speak('Shutting down systems. Goodbye.');
    process.exit();
  }

  else {
    const response = await askAI(command);
    speak(response);
  }
}

// =========================================
// STARTUP
// =========================================

function startup() {
  speak('Initializing systems.');
  speak('Jarvis online and ready.');
}

// =========================================
// INPUT SYSTEM
// =========================================

// =========================================
// API ROUTE
// =========================================

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await handleCommand(message);

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================================
// WEB PAGE
// =========================================

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Jarvis AI</title>
    <style>
      body {
        background: black;
        color: cyan;
        font-family: Arial;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .box {
        width: 700px;
        background: #111;
        padding: 20px;
        border-radius: 20px;
      }

      #chat {
        height: 400px;
        overflow-y: auto;
        border: 1px solid cyan;
        padding: 10px;
        margin-bottom: 10px;
      }

      input {
        width: 80%;
        padding: 10px;
      }

      button {
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>JARVIS AI</h1>
      <div id="chat"></div>
      <input id="input" placeholder="Talk to Jarvis" />
      <button onclick="sendMessage()">Send</button>
    </div>

    <script>
      async function sendMessage() {
        const input = document.getElementById('input');
        const chat = document.getElementById('chat');

        const message = input.value;

        chat.innerHTML += '<p><b>You:</b> ' + message + '</p>';

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        });

        const data = await response.json();

        chat.innerHTML += '<p><b>Jarvis:</b> ' + data.response + '</p>';

        input.value = '';
      }
    </script>
  </body>
  </html>
  `);
});

// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {
  console.log(`Jarvis running on port ${PORT}`);
});
  });
}

// =========================================
// MAIN
// =========================================

startup();
listen();

// =========================================
// INSTALLATION
// =========================================
// npm init -y
// npm install express openai axios moment

// =========================================
// API KEYS
// =========================================
// Paste your API keys directly into the code above.

// =========================================
// RUN APP
// =========================================
// node jarvis.js

// =========================================
// FUTURE FEATURES YOU CAN ADD
// =========================================
// - Real Voice Recognition
// - Face Recognition
// - Smart Home Controls
// - Desktop Automation
// - GUI Dashboard
// - Wake Word Detection
// - System Monitoring
// - Camera Vision
