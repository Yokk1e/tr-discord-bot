require("dotenv").config();
const express = require("express");
const db = require("./db");
const scraping = require("./scraping")

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  const linkData = {
    link: "test najea",
  };

  scraping.getNews()

  res.send("Talesrunner discord bot start!");
});

app.get("/test", async (req, res) => {
  const test = await db.collection("links").get();
  test.forEach((doc) => {
    console.log(doc.data);
  });
  res.json({ tte: "test" });
});

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
