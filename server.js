const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/screenshot", async (req, res) => {
  try {
    const url = req.query.url;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1080,
      height: 1024,
    });
    await page.goto(url);

    await function timeout() {
      return new Promise((resolve) => setTimeout(resolve, 1500));
    };
    const buffer = await page.screenshot();
    res.header({ field: "Constent-Type", value: "image/png" });
    res.header({
      field: "Constent-Disposition",
      value: "inline; filename=screenshot.png",
    });

    return res.send(buffer);
  } catch (error) {
    res.status(404).json({ message: "Not Found!" });
  }
});
app.listen(PORT, () => {
  console.log(`Server Port: ${PORT} `);
});
