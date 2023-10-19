import fetch from "node-fetch";
import fs from "fs/promises";

const LATEST_PRICES_ENDPOINT =
  "https://api.porssisahko.net/v1/latest-prices.json";

async function fetchLatestPriceData() {
  const response = await fetch(LATEST_PRICES_ENDPOINT);
  return response.json();
}

// Checks if price exists for a certain date
function checkIfPriceExists(date, prices) {
  const matchingPriceEntry = prices.find(
    (price) =>
      new Date(price.startDate) <= date && new Date(price.endDate) > date
  );

  if (!matchingPriceEntry) {
    throw "Price for the requested date " + date + " is missing";
  }
  return matchingPriceEntry.price;
}

function sortPricesByDate(prices) {
  // Sort the array by the startDate property
  prices.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  return prices;
}

// Sets fixed price of 5 snt / kwh to the dates that are missing price
function forecastElectricityPrice(yesterday, tomorrow, price_values) {
  let start = new Date(yesterday);
  start.setMinutes(0, 0, 0);
  let end = new Date(tomorrow);
  end.setHours(end.getHours() + 2);
  let updatedPriceValues = [...price_values];

  while (start <= end) {
    try {
      checkIfPriceExists(start, updatedPriceValues);
    } catch (fetchError) {
      let missingStartDate = new Date(start);
      let missingEndDate = new Date(start);
      missingEndDate.setHours(missingEndDate.getHours() + 1);
      updatedPriceValues.push(
        JSON.parse(
          JSON.stringify({
            price: 5.0,
            startDate: missingStartDate,
            endDate: missingEndDate,
          })
        )
      );
    }
    start.setHours(start.getHours() + 1);
  }

  let sortedPriceValues = sortPricesByDate(updatedPriceValues);

  return sortedPriceValues;
}

async function checkAndFetchData(priceFileName) {
  // We need to fetch data for a 48 h time period.
  // 24 h to past (yesterday) and 24 h to future (tomorrow) from current time (today)
  const today = new Date();
  const yesterday = new Date(today - 3600000 * 24);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    // Fetch the prices from api
    const { prices } = await fetchLatestPriceData();

    // Forecast rest of the needed prices
    const updatedPrices = forecastElectricityPrice(yesterday, tomorrow, prices);

    // Write prices to price-file
    await fs.writeFile(priceFileName, JSON.stringify(updatedPrices, null, 2));

    let priceToday, priceYesterday, priceTomorrow;

    // Check that needed dates were added
    try {
      priceToday = checkIfPriceExists(today, updatedPrices);
      priceYesterday = checkIfPriceExists(yesterday, updatedPrices);
      priceTomorrow = checkIfPriceExists(tomorrow, updatedPrices);
    } catch (e) {
      if (priceToday == undefined) {
        console.error("Missing data for today: ", e);
      }
      if (priceYesterday == undefined) {
        console.error("Missing data for yesterday: ", e);
      }
      if (priceTomorrow == undefined) {
        console.error("Missing data for tomorrow: ", e);
      }
    }
  } catch (e) {
    console.error("Failed to fetch the price: ", e);
  }
}

export default checkAndFetchData;
