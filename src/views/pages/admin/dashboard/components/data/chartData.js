import { $themeColors } from "@themeConfig";

const $strokeColor = "#ebe9f1";
const $textHeadingColor = "#5e5873";
const $goalStrokeColor2 = "#51e5a8";
const $barColor = "#f3f3f3";
const $trackBgColor = "#EBEBEB";

export const  goalOverviewRadialBar= {
    chart: {
      height: 245,
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
    colors: [$goalStrokeColor2],
    plotOptions: {
      radialBar: {
        offsetY: -10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "77%",
        },
        track: {
          background: $strokeColor,
          strokeWidth: "50%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            color: $textHeadingColor,
            fontSize: "2.86rem",
            fontWeight: "600",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [$themeColors.success],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    grid: {
      padding: {
        bottom: 30,
      },
    },
};

export const  payoutChart={
  chartOptions: {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      borderColor: $trackBgColor,
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: -30,
        bottom: -10,
      },
    },
    stroke: {
      width: 3,
    },
    colors: [$themeColors.info],
    markers: {
      size: 2,
      colors: $themeColors.info,
      strokeColors: $themeColors.info,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 5,
          fillColor: "#ffffff",
          strokeColor: $themeColors.info,
          size: 5,
        },
      ],
      shape: "circle",
      radius: 2,
      hover: {
        size: 3,
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "0px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  },
};

  export const  profiltChart={
    chartOptions: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      grid: {
        borderColor: $trackBgColor,
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: -30,
          bottom: -10,
        },
      },
      stroke: {
        width: 3,
      },
      colors: [$themeColors.info],
      markers: {
        size: 2,
        colors: $themeColors.info,
        strokeColors: $themeColors.info,
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: "#ffffff",
            strokeColor: $themeColors.info,
            size: 5,
          },
        ],
        shape: "circle",
        radius: 2,
        hover: {
          size: 3,
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: "0px",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    },
  };

  export const  clientChart={
    chartOptions: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      grid: {
        borderColor: $trackBgColor,
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: -30,
          bottom: -10,
        },
      },
      stroke: {
        width: 3,
      },
      colors: [$themeColors.info],
      markers: {
        size: 2,
        colors: $themeColors.info,
        strokeColors: $themeColors.info,
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: "#ffffff",
            strokeColor: $themeColors.info,
            size: 5,
          },
        ],
        shape: "circle",
        radius: 2,
        hover: {
          size: 3,
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: "0px",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    },
  };