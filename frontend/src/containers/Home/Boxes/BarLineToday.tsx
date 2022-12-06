import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { slackSeries } from "./FakeData";

export default function BarLineToday() {
  return (
    <Box sx={{ p: 3, pb: 1}} dir="ltr">
      <ReactApexChart
        type="line"
        series={slackSeries}
        options={{
          labels: [
            "00h",
            "01h",
            "02h",
            "03h",
            "04h",
            "05h",
            "06h",
            "07h",
            "08h",
            "09h",
            "10h",
            "11h",
            "12h",
            "13h",
            "14h",
            "15h",
            "16h",
            "17h",
            "18h",
            "19h",
            "20h",
            "21h",
            "22h",
            "23h",
          ],
          chart: {
              toolbar: {
                tools: {
                  zoomin: true,
                  zoomout: true,
                  reset: true,
                  download: false,
                  zoom: false,
                  customIcons: [],
                  selection: true,
                  pan: true,
                },
              },
              stacked: true,
            },
            plotOptions: {
              bar: {
                columnWidth: "60%",
              },
            },
            dataLabels: {
            },
            stroke: {
              curve: "smooth",
            },
        }}
      />

    </Box>
  );
}
