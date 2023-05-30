import { faL } from "@fortawesome/free-solid-svg-icons";
import { lab } from "d3-color";
import React, { Component } from "react";
import ApexCharts from "react-apexcharts";

const API_URI = process.env.REACT_APP_API_URI;

class ColumnChart extends Component {
  constructor(props) {
    super(props);

    console.log(props[2]);

    this.state = {
      series: [
        {
          name: "총점수",
          data: props[1],
        },
      ],
      options: {
        chart: {
          height: 250,
          type: "bar",
        },
        colors: ["#0285FF"],
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: props[0],
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#f22c54",
                colorTo: "#f22c54",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "점";
            },
          },
        },
        tooltip: {
          enabled: true,
          custom: function ({ dataPointIndex }) {
            let label = props[2][dataPointIndex];

            let tooltipContent = "";

            if (Array.isArray(label)) {
              tooltipContent = label
                .map((data) => "<div>" + data + "</div>")
                .join("");
            } else if (typeof label === "string" || typeof label === "number") {
              tooltipContent = "<div>" + label + "</div>";
            } else {
              tooltipContent = "<div>Invalid data format</div>";
            }

            return tooltipContent;
            // return label;
          },
        },

        title: {
          text: "파워레인저 님의 상위 직군 역량",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" style={{ cursor: "help" }}>
        <ApexCharts
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={250}
        />
      </div>
    );
  }
}

export default ColumnChart;
