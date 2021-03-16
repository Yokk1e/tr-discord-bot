require("dotenv").config();
const express = require("express");
const Discord = require("discord.js");
const cron = require("node-cron");

const db = require("./db");
const scraping = require("./scraping");

const app = express();
const PORT = process.env.PORT || 8080;

const webhookClient = new Discord.WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);

app.get("/", (req, res) => {
  res.send("hello yokk1e");
});

app.get("/get-news/trigger", async (req, res) => {
  try {
    await triggerNews();
  } catch (error) {
    console.log(error);
  }

  res.send("success");
});

async function triggerNews() {
  const currentLinks = await scraping.getNews();

  let oldLinks = await db.collection("links").get();

  let oldLinksArray = [];
  oldLinks.forEach((link) => {
    oldLinksArray.push(link.data().link);
  });
  const links = currentLinks.filter((link) => {
    return oldLinksArray.indexOf(link) === -1;
  });

  for (const link of links) {
    try {
      await webhookClient.send(link);
      await db.collection("links").doc().set({ link });
    } catch (error) {
      console.log(error);
    }
  }
}
/*
 * running a task every 10 minutes
 */

// let isProcessRunning = false;
// cron.schedule("*/10 * * * *", async () => {
//   if (!isProcessRunning) {
//     isProcessRunning = true;
//     await triggerNews();
//     isProcessRunning = false;
//   }
// });

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
