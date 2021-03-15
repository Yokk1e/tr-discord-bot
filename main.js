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

/*
 * running a task every 10 minutes
 */

let isProcessRunning = false;
cron.schedule("*/10 * * * *", async () => {
  if (!isProcessRunning) {
    isProcessRunning = true;
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
    isProcessRunning = false;
  }
});

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
