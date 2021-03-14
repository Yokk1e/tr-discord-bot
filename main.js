const express = require("express");
require("dotenv").config();
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  const linkData = {
    link: "test najea",
  };

  db.collection("links").doc().set(linkData);

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
