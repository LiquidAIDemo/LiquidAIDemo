import fetch from "node-fetch";
import fs from "fs/promises";

const LATEST_PRICES_ENDPOINT =
  "https://api.porssisahko.net/v1/latest-prices.json";
const PRICES_FILE = "./data/prices.json";

async function fetchLatestPriceData() {
  const response = await fetch(LATEST_PRICES_ENDPOINT);
  return response.json();
}

function getPriceForDate(date, prices) {
  const matchingPriceEntry = prices.find(
    (price) =>
      new Date(price.startDate) <= date && new Date(price.endDate) > date
  );

  if (!matchingPriceEntry) {
    throw "Price for the requested date is missing";
  }

  return matchingPriceEntry.price;
}

function forecastElectricityPrice(yesterday, tomorrow, price_values) {
  let i = yesterday;
  i.setMinutes(0, 0, 0);
  let updatedPriceValues = [...price_values]; // Create a copy of the original array

  while (i <= tomorrow) {
    try {
      let price = getPriceForDate(i, updatedPriceValues);
    } catch (fetchError) {
      updatedPriceValues.push({
        price: 5,
        startDate: new Date(i),
        endDate: new Date(i - 3600000),
      });
    }
    i.setHours(i.getHours() + 1);
  }
  return updatedPriceValues;
}

(async () => {
  try {
    const today = new Date();
    const yesterday = new Date(today - 3600000 * 24);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let priceToday, priceYesterday, priceTomorrow;

    try {
      // Check if price data for todays has already been fetched
      if (
        await fs
          .access(PRICES_FILE)
          .then(() => true)
          .catch(() => false)
      ) {
        const data = await fs.readFile(PRICES_FILE, "utf-8");
        const prices = JSON.parse(data);
        priceToday = getPriceForDate(today, prices);
      }
    } catch (fetchError) {}

    try {
      // Check if price data for yesterday has already been fetched
      if (
        await fs
          .access(PRICES_FILE)
          .then(() => true)
          .catch(() => false)
      ) {
        const data = await fs.readFile(PRICES_FILE, "utf-8");
        const prices = JSON.parse(data);
        priceYesterday = getPriceForDate(yesterday, prices);
      }
    } catch (fetchError) {}

    try {
      // Check if price data for tomorrow has already been fetched
      if (
        await fs
          .access(PRICES_FILE)
          .then(() => true)
          .catch(() => false)
      ) {
        const data = await fs.readFile(PRICES_FILE, "utf-8");
        const prices = JSON.parse(data);
        priceTomorrow = getPriceForDate(tomorrow, prices);
      }
    } catch (fetchError) {}

    if (!priceToday || !priceYesterday || !priceTomorrow) {
      // Fetch new price information from api
      const { prices } = await fetchLatestPriceData();
      priceToday = getPriceForDate(today, prices);
      priceYesterday = getPriceForDate(yesterday, prices);

      // Save the data to prices.json
      await fs.writeFile(PRICES_FILE, JSON.stringify(prices, null, 2));
    }
    if (!priceToday || !priceYesterday || !priceTomorrow) {
      const data = await fs.readFile(PRICES_FILE, "utf-8");
      const prices = JSON.parse(data);
      let updatedPrices = forecastElectricityPrice(yesterday, tomorrow, prices);
      // Save the data to prices.json
      await fs.writeFile(PRICES_FILE, JSON.stringify(updatedPrices, null, 2));
    }
  } catch (e) {
    console.error(`Failed to fetch the price: ${e}`);
  }
})();

export default fetchLatestPriceData;
