import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import ApexCharts from "react-apexcharts";

class PastChart extends Component {
  constructor(props) {
    super(props);

    // console.log(props[0]);
    this.state = {
      series: [
        {
          data: props[1],
        },
      ],
      options: {
        chart: {
          height: 250,
          type: `area`,
          zoom: {
            enabled: false,
          },
        },
        colors: ["#0285FF"],
        dataLabels: {
          enabled: false,
          // background: { opacity: 0.7 },
        },

        stroke: {
          width: 5,
          curve: "smooth",
        },
        // fill: {
        //   type: "gradient",
        //   gradient: {
        //     shade: "dark",
        //     gradientToColors: ["#FDD835"],
        //     shadeIntensity: 1,
        //     type: "horizontal",
        //     opacityFrom: 1,
        //     opacityTo: 1,
        //     stops: [0, 100, 100, 100],
        //   },
        // },
        // grid: {
        //   row: {
        //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //     opacity: 0.5,
        //   },
        // },
        xaxis: {
          // title: { text: "날짜", rotate: -45, offsetX: 0, offsetY: -20 },

          categories: props[0],
          labels: {
            formatter: function (value, index) {
              // Extract year and month if the value is defined
              if (value) {
                const month = (value) => {
                  if (value[4] === "0") {
                    return value.substr(5);
                  } else {
                    return value.substr(4);
                  }
                };
                const year = value.substr(2, 2);

                const formattedLabel = (year, month) => {
                  if (month === "11" || month === "5") {
                    return `${year}년 ${month}월`;
                  } else {
                    return ``;
                  }
                };

                return formattedLabel(year, month(value));
              }

              return value; // Return the value as is if it is undefined
            },
            rotate: 0,
          },
        },
        yaxis: {
          title: { text: "공고수" },
          opposite: true,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ApexCharts
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={250}
          width={1100}
        />
      </div>
    );
  }
}

export default PastChart;

// const domContainer = document.querySelector("#app");
// ReactDOM.render(React.createElement(ApexChart), domContainer);
