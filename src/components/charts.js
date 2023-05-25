import React, { Component } from "react";
import ApexCharts from "react-apexcharts";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    //console.log(props);
    this.state = {
      series: [
        {
          data: props[1],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          title: {text : "날짜", rotate: 0, offsetX: 0, offsetY: -20 },
          categories: props[0],
        },
        yaxis: {
          title: { text: "공고수", rotate: 0, offsetX: -8, offsetY: -80 },
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
          type="line"
          height={250}
          width={1100}
        />
      </div>
    );
  }
}

export default ApexChart;

// const domContainer = document.querySelector("#app");
// ReactDOM.render(React.createElement(ApexChart), domContainer);
