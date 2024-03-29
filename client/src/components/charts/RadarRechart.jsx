import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import useDateFilter from "../../hooks/useDateFilter";
import Nodata from "./Nodata";
const RadarRechart = ({ data, type, label, labelType, title }) => {
  return (
    <>
      <Radar
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title || "Custom Chart Title",
              padding: {
                top: 10,
              },
              font: {
                family: "Montserrat",
                size: 15,
                weight: 600,
              },
              position: "bottom",
            },
          },
        }}
        data={{
          labels: data.map((d) => d[labelType]),
          datasets: [
            {
              fill: true,
              label: label,
              data: data.map((d) => d[type]),
              borderWidth: 1,
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
            },
          ],
        }}
      />
    </>
  );
};

export default RadarRechart;
