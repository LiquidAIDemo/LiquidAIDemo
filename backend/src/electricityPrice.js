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

(async () => {
  try {
    const now = new Date();
    const halfDayAgo = new Date(now - 3600000 * 12);

    let priceNow, priceHalfDayAgo;

    try {
      // Check if price data has already been fetched
      if (
        await fs
          .access(PRICES_FILE)
          .then(() => true)
          .catch(() => false)
      ) {
        const data = await fs.readFile(PRICES_FILE, "utf-8");
        const prices = JSON.parse(data);
        priceNow = getPriceForDate(now, prices);
        priceHalfDayAgo = getPriceForDate(halfDayAgo, prices);

        console.log(
          `Price now (from saved) (${now.toISOString()}): ${priceNow} snt / kWh (includes alv)`
        );
        console.log(
          `Price halfDayAgo (from saved) (${halfDayAgo.toISOString()}): ${priceHalfDayAgo} snt / kWh (includes alv)`
        );
      }
    } catch (fetchError) {
      console.error(`Failed to fetch saved data: ${fetchError}`);
    }

    if (!priceNow || !priceHalfDayAgo) {
      console.log("Fetching prices");
      // Fetch new price information from api
      const { prices } = await fetchLatestPriceData();
      priceNow = getPriceForDate(now, prices);
      priceHalfDayAgo = getPriceForDate(halfDayAgo, prices);

      // Save the data to prices.json
      await fs.writeFile(PRICES_FILE, JSON.stringify(prices, null, 2));

      console.log(
        `Price now (${now.toISOString()}): ${priceNow} snt / kWh (includes alv)`
      );
      console.log(
        `Price halfDayAgo (${halfDayAgo.toISOString()}): ${priceHalfDayAgo} snt / kWh (includes alv)`
      );
    }
  } catch (e) {
    console.error(`Failed to fetch the price: ${e}`);
  }
})();

export default fetchLatestPriceData;
