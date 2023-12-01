import { useEffect, useState, memo } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const Price = ({ price }) => {
  if (price !== null && price !== undefined) {
    return (
      <Typography>Current price: {price.toFixed(2)} cents / kWh</Typography>
    );
  } else {
    return <Typography>Loading current price</Typography>;
  }
};

const Consumption = ({ consumption }) => {
  if (consumption !== null && consumption !== undefined) {
    return (
      <Typography>Current consumption: {consumption.toFixed(2)} kWh</Typography>
    );
  } else {
    return <Typography>Loading current consumption</Typography>;
  }
};

const TotalConsumption = ({ total }) => {
  if (total !== null && total !== undefined) {
    return <Typography>Total consumption: {total.toFixed(2)} kWh</Typography>;
  } else {
    return <Typography>Loading total consumption</Typography>;
  }
};

const Chart = memo(function Chart({ consumptionData }) {
  if (
    consumptionData.length > 0 &&
    !consumptionData.every((item) => isNaN(item.time) || isNaN(item.total))
  ) {
    const xAxisData = consumptionData.map(
      (entry) =>
        entry.time.getHours() + ":00-" +
        (parseInt(entry.time.getHours()) + 1) + ":00"
    );
    return (
      <LineChart
        xAxis={[
          {
            data: xAxisData,
            scaleType: "band",
            label: "time (h)",
            tickLabelStyle: { fontSize: 10 },
          },
        ]}
        series={[
          {
            data: consumptionData.map((entry) => entry.total),
            area: true,
            curve: "natural",
            showMark: false,
            label: "cents",
          },
        ]}
        sx={{
          "& .MuiAreaElement-root": {
            fillOpacity: 0.4,
          },
        }}
      />
    );
  }
  return null;
});

function ElectricityPrice({ demoTime, demoPassedHrs, totalConsumption }) {
  const [prices, setPrices] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentConsumption, setCurrentConsumption] = useState(null);
  const [consumptionData, setConsumptionData] = useState([]);

  useEffect(() => {
    try {
      axios(import.meta.env.PROD ? "/backend" : "http://localhost:3001/").then(
        (res) => {
          setPrices(res.data);
        }
      );
    } catch (e) {
      console.error("Error fetching prices:", e);
    }
    const savedConsumptionData = JSON.parse(
      window.sessionStorage.getItem("consumptionData")
    );
    if (savedConsumptionData) {
      const formattedData = savedConsumptionData.map((entry) => ({
        time: new Date(entry.time),
        total: entry.total,
      }));
      setConsumptionData(formattedData);
    } else {
      setConsumptionData([]);
    }
  }, []);

  useEffect(() => {
    const newPrice = updateCurrentPrice(prices, demoTime);
    const newCurrentConsumption = updateCurrentConsumption(
      totalConsumption,
      demoTime
    );
    setCurrentPrice(newPrice);
    setCurrentConsumption(newCurrentConsumption);
    if (demoPassedHrs === 0) {
      setConsumptionData([
        { time: new Date(demoTime), total: newPrice * newCurrentConsumption },
      ]);
      window.sessionStorage.setItem(
        "consumptionData",
        JSON.stringify([
          { time: new Date(demoTime), total: newPrice * newCurrentConsumption },
        ])
      );
    } else if (demoPassedHrs < 24) {
      setConsumptionData((prev) => {
        const newItem = {
          time: new Date(demoTime),
          total: newPrice * newCurrentConsumption,
        };

        if (
          !prev.some((item) => item.time.getTime() === newItem.time.getTime())
        ) {
          const newData = [...prev, newItem];
          window.sessionStorage.setItem(
            "consumptionData",
            JSON.stringify(newData)
          );
          return newData;
        }
        return prev;
      });
    }
  }, [demoPassedHrs, demoTime, prices, totalConsumption]);

  function updateCurrentConsumption(totalConsumption, demoTime) {
    const demoTimeFormatted = new Date(demoTime);
    if (totalConsumption.length === 0) {
      return null;
    } else {
      return totalConsumption.find(
        (obj) => obj.hour === demoTimeFormatted.getHours()
      ).value;
    }
  }

  function updateCurrentPrice(prices, demoTime) {
    if (prices.length === 0) {
      return null;
    } else {
      const demoTimeCopy = new Date(demoTime);
      demoTimeCopy.setMinutes(0, 0);
      const formattedDemoTime = demoTimeCopy.toLocaleString("fi-FI", {
        timeZone: "Europe/Helsinki",
      });
      const priceObj = prices.find(
        (priceObj) => priceObj.startDate == formattedDemoTime
      );
      if (priceObj) {
        return priceObj.price;
      }
    }
  }

  const total = totalConsumption.reduce((a, b) => a + b.value, 0);

  return (
    <Box
      sx={{
        height: "34vh",
      }}
    >
      <Price price={currentPrice} />
      <Consumption consumption={currentConsumption} />
      <TotalConsumption total={total} />
      <Typography marginTop="15px">
        Cost of consumed electricity by hour
      </Typography>
      <Box
        sx={{
          borderRadius: "30px",
          background: "white",
          width: "40vh",
          height: "23vh",
          border: "1px solid #DCDCDC",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Chart consumptionData={consumptionData} />
      </Box>
    </Box>
  );
}

export default ElectricityPrice;
