import express from "express";
import fs from "fs/promises";
import fetchLatestPriceData from "./src/fetchElectricityPrice.js";

const app = express();
const PORT = process.env.PORT || 3001;

const PRICES_FILE = "data/prices.json";

// Define a function to fetch and save the latest price data
async function updatePriceData() {
  try {
    const { prices } = await fetchLatestPriceData();
    await fs.writeFile(PRICES_FILE, JSON.stringify(prices, null, 2));
    console.log("Price data updated.");
  } catch (e) {
    console.error(`Failed to fetch the latest price data: ${e}`);
  }
}

// Fetch and update price data when the server starts
updatePriceData();

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(PRICES_FILE, "utf-8");
    const prices = JSON.parse(data);

    // Sort the prices array by the 'startDate' property in ascending order
    prices.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    res.json(prices);
  } catch (err) {
    res.status(500).send("Error reading price data.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Update data every hour
setInterval(updatePriceData, 60 * 60 * 1000);
