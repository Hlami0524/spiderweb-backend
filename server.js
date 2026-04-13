import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

let newsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 10;

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/api/news", async (req, res) => {
  try {
    const now = Date.now();

    if (newsCache && (now - lastFetchTime < CACHE_DURATION)) {
      console.log("Serving from cache 🧠");
      return res.json(newsCache);
    }

    console.log("Fetching from GNews 🌍");

    const response = await fetch(
      "https://gnews.io/api/v4/top-headlines?country=za&apikey=86694ebbca323058620c4731f041f8b6"
    );

    const data = await response.json();

    newsCache = data;
    lastFetchTime = now;

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}); 

let sportsCache = null;
let lastSportsFetchTime = 0;
const SPORTS_CACHE_DURATION = 10 * 60 * 100;

app.get("/api/sports", async (req, res) => {
  try {
    const now = Date.now();

    if (sportsCache && (now - lastSportsFetchTime < SPORTS_CACHE_DURATION)) {
      console.log("Serving from cache 🧠");
      return res.json(sportsCache);
    }

    console.log("Fetching from GNews 🌍");

    const response = await fetch(
      "https://gnews.io/api/v4/top-headlines?country=za&apikey=86694ebbca323058620c4731f041f8b6"
    );
    const data = await response.json();
    sportsCache = data 
    delete sportsCache.information;
    lastSportFetchTime = now;
    res.json(sportsCache);
  } catch (err) {
    console.error("GNews sports fetch error:" , err);
    res.status(500).json({error:"Failed to fetch sports news"});
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on network`);
});