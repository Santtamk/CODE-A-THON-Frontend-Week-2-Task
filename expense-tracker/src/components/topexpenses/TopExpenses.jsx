import React from 'react';
import ReactApexChart from 'react-apexcharts';

class TopExpenses extends React.Component {
  constructor(props) {
    super(props);

    // Process expenses to get the data for the chart
    const data = this.processExpenses(props.expenses);

    this.state = {
      series: [{
        data: data.values
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: data.categories,
        }
      }
    };
  }

  processExpenses(expenses) {
    // Reduce expenses to get total value for each category
    const processedData = expenses.reduce((acc, expense) => {
      const found = acc.find(item => item.category === expense.category);
      if (found) {
        found.value += expense.price;
      } else {
        acc.push({ category: expense.category, value: expense.price });
      }
      return acc;
    }, []);

    // Extract categories and values for the chart
    const categories = processedData.map(item => item.category);
    const values = processedData.map(item => item.value);

    return { categories, values };
  }

  render() {
    return (
      <div>
        <h2>Top Expenses</h2>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default TopExpenses;
