import React, { Component } from "react"; // Importing necessary modules
import ApexCharts from "react-apexcharts";

class PastChart extends Component {
  // Creating a class component named PastChart
  constructor(props) {
    // Constructor function with props as parameter
    super(props); // Calling the constructor of the parent class
    this.state = {
      // Initializing the state object
      series: [
        // Initializing the series array
        {
          data: props[1], // Setting the data property of the first object in the series array to the second element of the props array
        },
      ],
      options: {
        // Initializing the options object
        chart: {
          // Setting the chart options
          height: 250, // Setting the height of the chart
          type: `area`, // Setting the type of the chart to area
          zoom: {
            // Setting the zoom options
            enabled: false, // Disabling zoom
          },
        },
        colors: ["#0285FF"], // Setting the color of the chart
        dataLabels: {
          // Setting the data label options
          enabled: false, // Disabling data labels
        },

        stroke: {
          // Setting the stroke options
          width: 5, // Setting the width of the stroke
          curve: "smooth", // Setting the curve of the stroke to smooth
        },
        xaxis: {
          // Setting the x-axis options
          categories: props[0], // Setting the categories property to the first element of the props array
          labels: {
            // Setting the label options
            formatter: function (value, index) {
              // Setting the formatter function for the labels
              if (value) {
                // Checking if the value exists
                const month = (value) => {
                  // Defining a function to extract the month from the value
                  if (value[4] === "0") {
                    // Checking if the month is a single digit
                    return value.substr(5); // Returning the month without the leading zero
                  } else {
                    return value.substr(4); // Returning the month with the leading zero
                  }
                };
                const year = value.substr(2, 2); // Extracting the year from the value

                const formattedLabel = (year, month) => {
                  // Defining a function to format the label
                  if (month === "11" || month === "5") {
                    // Checking if the month is November or May
                    return `${year}년 ${month}월`; // Returning the formatted label
                  } else {
                    return ``; // Returning an empty string
                  }
                };

                return formattedLabel(year, month(value)); // Returning the formatted label
              }

              return value; // Return the value as is if it is undefined
            },
            rotate: 0, // Setting the rotation of the labels
          },
        },
        yaxis: {
          // Setting the y-axis options
          title: { text: "공고수" }, // Setting the title of the y-axis
          opposite: true, // Setting the y-axis to be on the opposite side of the chart
        },
      },
    };
  }

  render() {
    // Render function
    return (
      <div id="chart">
        {/* Creating a div with id chart */}
        <ApexCharts // Creating an ApexCharts component
          options={this.state.options} // Passing the options object as a prop
          series={this.state.series} // Passing the series array as a prop
          type="area" // Setting the type of the chart to area
          height={250} // Setting the height of the chart
          width={1100} // Setting the width of the chart
        />
      </div>
    );
  }
}

export default PastChart; // Exporting the PastChart component as default
