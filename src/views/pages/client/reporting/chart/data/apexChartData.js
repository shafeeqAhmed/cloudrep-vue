const chartColors = {
  column: {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
  },
  success: {
    shade_100: "#7eefc7",
    shade_200: "#06774f",
  },
  donut: {
    series1: "#ffe700",
    series2: "#00d4bd",
    series3: "#826bf8",
    series4: "#2b9bf4",
    series5: "#FFA1A1",
  },
  area: {
    series3: "#a4f8cd",
    series2: "#60f2ca",
    series1: "#2bdac7",
  },
};


const performanceChartColors = {
  column: {
    series1: "#826af9",
    series2: "#a4f8cd",
    series3: "#ff0000",
    series4: "#ffe700"
  }
};


export const apexChatData = {
  chartOptions: {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: [chartColors.column.series1, chartColors.column.series2],
    plotOptions: {
      bar: {
        columnWidth: "50%",
        colors: {},
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "top",
      fontSize: "14px",
      fontFamily: "Montserrat",
      horizontalAlign: "left",
    },
    stroke: {
      show: true,
      colors: ["transparent"],
    },
    grid: {
      xaxis: {
        lines: {},
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      // opposite: isRtl,
    },
    fill: {
      opacity: 1,
    },
  },
};

export const chartSeries = {
  series: [
    {
      name: "Calls",
      data: [],
    },
  ],
};


export const clientPerformanceChartSeries={

  series:[
    {
      name: "Revenue",
      type: "column",
      data: [],
    },
    {
      name: "Incomming",
      type: "area",
      data: [],
    },
    {
      name: "Connected",
      type: "area",
      data: [],
    },
  ]
  };

  export const clientPerformanceChatData = {
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      colors: [performanceChartColors.column.series2, performanceChartColors.column.series3, performanceChartColors.column.series4],
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Calls Count",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };