import React, { Component } from "react";
import ApexCharts from "react-apexcharts";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    // Set the initial state of the component
    this.state = {
      series: [
        {
          data: props[1], // Set the data for the chart
        },
      ],
      options: {
        chart: {
          height: 250,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        colors: ["#0285FF"], // Set the color of the chart
        dataLabels: {
          enabled: true,
        },

        stroke: {
          width: 5,
          curve: "smooth",
        },

        // Set the x-axis options
        xaxis: {
          categories: props[0], // Set the categories for the x-axis
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
                  return `${year}년 ${month}월`; // Format the label as "YY년 MM월"
                };

                return formattedLabel(year, month(value));
              }

              return value; // Return the value as is if it is undefined
            },
            rotate: 0,
          },
        },
        yaxis: {
          title: { text: "공고수" }, // Set the title of the y-axis
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
