import fetchLatestPriceData from "./src/electricityPrice.js";

(async () => {
  try {
    const { prices } = await fetchLatestPriceData();

    // Add code to handle price data
  } catch (e) {
    console.error(`Failed to fetch the price: ${e}`);
  }
})();
