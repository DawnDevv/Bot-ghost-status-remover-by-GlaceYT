const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config(); // To load the token from the .env file
const express = require('express');
const path = require('path');

// Create an Express app to serve the index.html file
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log('\x1b[36m[ SERVER ]\x1b[0m', '\x1b[32m SH : http://localhost:' + port + ' ✅\x1b[0m');
});

// Initialize the bot client with the required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds // To connect to guilds (servers)
  ],
});

// Function to login the bot using the token
async function login() {
  try {
    // Login using the token stored in the .env file
    await client.login(process.env.TOKEN);
    console.log('\x1b[36m[ LOGIN ]\x1b[0m', `\x1b[32mLogged in as: ${client.user.tag} ✅\x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m', 'Failed to log in:', error);
    process.exit(1); // Exit the process if login fails
  }
}

// Function to update the bot's status
function updateStatus() {
  const customStatus = "Playing on the ISA"; // Custom status message for the bot
  client.user.setPresence({
    activities: [{ name: customStatus, type: ActivityType.Playing }], // Set activity type to Playing
    status: 'online', // Set bot's status to online
  });
  console.log('\x1b[33m[ STATUS ]\x1b[0m', `Updated status to: ${customStatus}`);
}

// Function to log a heartbeat message every 30 seconds
function heartbeat() {
  setInterval(() => {
    console.log('\x1b[35m[ HEARTBEAT ]\x1b[0m', `Bot is alive at ${new Date().toLocaleTimeString()}`);
  }, 30000); // Log heartbeat every 30 seconds
}

// When the bot is ready
client.once('ready', () => {
  console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mPing: ${client.ws.ping} ms \x1b[0m`);
  updateStatus(); // Update the bot status when it's ready
  heartbeat(); // Start the heartbeat function
});

// Start the bot by logging in
login();
