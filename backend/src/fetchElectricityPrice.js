import fetch from "node-fetch";
import fs from "fs/promises";

const LATEST_PRICES_ENDPOINT =
  "https://api.porssisahko.net/v1/latest-prices.json";

const ONE_HOUR_PRICES =
  "https://api.porssisahko.net/v1/price.json?date=[date]&hour=[hour]";

async function fetchLatestPriceData() {
  const response = await fetch(LATEST_PRICES_ENDPOINT);
  return response.json();
}

async function fetchElectricityPriceForDateAndHour(date, hour) {
  const url = ONE_HOUR_PRICES.replace("[date]", date).replace("[hour]", hour);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Failed to fetch electricity price:", error);
    return 5; // TODO: Decide what to do if error
  }
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

async function fetchMissingPriceHistory(yesterday, today, price_values) {
  let start = new Date(yesterday);
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() - 2);
  let end = new Date(today);
  let updatedPriceValues = [...price_values];

  while (start <= end) {
    try {
      checkIfPriceExists(start, updatedPriceValues);
    } catch (fetchError) {
      let missingStartDate = new Date(start);
      let missingEndDate = new Date(start);
      missingEndDate.setHours(missingEndDate.getHours() + 1);

      const year = missingStartDate.getFullYear();
      const month = (missingStartDate.getMonth() + 1)
        .toString()
        .padStart(2, "0"); // Months start from 0
      const day = missingStartDate.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      try {
        let fetchedPrice = await fetchElectricityPriceForDateAndHour(
          formattedDate,
          missingStartDate.getHours()
        );

        updatedPriceValues.push(
          JSON.parse(
            JSON.stringify({
              price: fetchedPrice,
              startDate: missingStartDate,
              endDate: missingEndDate,
            })
          )
        );
      } catch (error) {
        console.error("Failed to fetch electricity price:", error);
        // TODO: Decide what to do if error
      }
    }
    start.setHours(start.getHours() + 1);
  }

  let sortedPriceValues = sortPricesByDate(updatedPriceValues);

  return sortedPriceValues;
}

// Sets fixed price of 5 snt / kwh to the dates that are missing price
function forecastElectricityPrice(today, tomorrow, price_values) {
  let start = new Date(today);
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

      // Find the previous day's price if available
      const previousDay = new Date(missingStartDate);
      previousDay.setDate(previousDay.getDate() - 1);
      const previousPrice = updatedPriceValues.find(
        (price) =>
          new Date(price.startDate) <= previousDay &&
          new Date(price.endDate) > previousDay
      );

      if (previousPrice) {
        // Use the previous day's price
        updatedPriceValues.push({
          price: previousPrice.price,
          startDate: missingStartDate,
          endDate: missingEndDate,
        });
      } else {
        // If no previous day's price is available, set it to 5
        updatedPriceValues.push({
          price: 5,
          startDate: missingStartDate,
          endDate: missingEndDate,
        });
      }
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
    // Fetch the prices from latest prices api
    const { prices } = await fetchLatestPriceData();

    // Fetch missing history prices from single price api
    const filledPrices = await fetchMissingPriceHistory(
      yesterday,
      today,
      prices
    );

    // Forecast rest of the needed prices
    const updatedPrices = forecastElectricityPrice(
      today,
      tomorrow,
      filledPrices
    );

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
    // TODO: Decide what to do if error
  }
}

export default checkAndFetchData;
