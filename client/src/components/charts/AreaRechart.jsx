import useDateFilter from "../../hooks/useDateFilter";
import Nodata from "./Nodata";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const AreaRechart = ({
  data,
  type,
  label,
  labelType,
  type2,
  label2,
  num,
  title,
  fill,
}) => {
  const { filteredData, isNoData, renderButtons } = useDateFilter(
    labelType,
    data
  );

  const createdAtLabels = [...new Set(filteredData.map((d) => d.createdAt))];
  const datasets = filteredData.reduce((acc, curr) => {
    const index = acc.findIndex((d) => d.label === curr.stack);
    if (index !== -1) {
      acc[index].data.push(curr[type]);
    } else {
      const newData = {
        label: curr.stack,
        data: createdAtLabels.map((l) => {
          const recentData = filteredData.find(
            (d) => d.stack === curr.stack && d.createdAt === l
          );
          return recentData ? recentData[type] : null;
        }),
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
        borderWidth: 2.5,
        tension: 0.2,
        fill: fill,
      };
      acc.push(newData);
    }
    return acc;
  }, []);

  return (
    <>
      {renderButtons()}
      <>
        <Line
          options={{
            spanGaps: true,
            responsive: true,
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: label[0],
                  font: {
                    family: "Montserrat",
                    weight: "bold",
                  },
                },
              },
              y: {
                stacked: false,
                title: {
                  display: true,
                  text: label[1],
                  font: {
                    family: "Montserrat",
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: title || "Custom Chart Title",
                padding: {
                  top: 10,
                  bottom: 10,
                },
                font: {
                  family: "Montserrat",
                  size: 15,
                  weight: 600,
                },
                position: "bottom",
              },
              ticks: {
                beginAtZero: true,
                callback: function (value, index, values) {
                  if (num === "percentage") {
                    return value + "%";
                  } else if (num === "currency") {
                    return "$" + value;
                  } else {
                    return value;
                  }
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
          }}
          data={{
            labels: createdAtLabels,
            datasets: datasets,
          }}
          type="area"
          // connectNulls={true}
        />
      </>
    </>
  );
};

export default AreaRechart;
