import React, { useEffect, useState } from "react";
import { getExchangeCurrency, getHistoryExchangeCurrency } from "./util";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const App = () => {
  const [data, setData] = useState();

  const [historicalCurrency, setHistoricalCurrency] = useState(null);

  const [chart, setChart] = useState({
    labels: [],
    datasets: [
      {
        label: "valor de la moneda a traves del tiempo",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getExchangeCurrency().then((res) => setData(res));
  }, []);

  

  useEffect(() => {
    
    if(historicalCurrency){

      
      setChart({
        ...chart,
        labels : [new Date( new Date(historicalCurrency.timestamp * 1000).toUTCString()).toISOString().split("T")[0] , new Date(data.timeUTC).toISOString().split("T")[0] ],
        datasets: [
         
          ...chart.datasets.map(el => el === el &&  { ...el , data : [ historicalCurrency.rates.EUR , data.rates.EUR ] }  )
        ]
      })


      

      

    }


    


  }, [historicalCurrency]);


  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const queryCurrency = (e) => {
    const { value } = e.target;

    getHistoryExchangeCurrency(value).then((res) => setHistoricalCurrency(res));
  };

  return (
    <div>
      <h1 style={{textAlign:"center",fontSize:"5rem"}} >Juan David Sandoval Franco</h1>
      <h1 className="main-title">Tasa Dolar / Euro</h1>
      <h2>Tasa vigente en la fecha {data && new Date(data.timeUTC).toUTCString()}</h2>
      <h2>Tasa vigente en la hora local {data && data.localHour} </h2>
      <h2 className="data">
        1 dolar estadounidense equivale a {data && data.rates.EUR} euros
      </h2>
      <div className="cont-main">
        <h2>Escoge una fecha para ver el comportamiento historico de la equivalencia monedas</h2>
        <input
          onChange={(e) => queryCurrency(e)}
          style={{ width: "300px", padding: "20px" }}
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={new Date().toISOString().split("T")[0]}
        />
      </div>
      <Line
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        data={chart}
      ></Line>
    </div>
  );
};

export default App;
