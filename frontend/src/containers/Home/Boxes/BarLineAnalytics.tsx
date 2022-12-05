import {
  Box,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { green, red, blue, grey } from "@mui/material/colors";

interface IProps {
  title: string;
  subtitle: string;
}

interface ChartDataType {
  name: string;
  type: string;
  fill: string;
  data: { x: string; y: number; }[];
}

const fakeData: ChartDataType[] = [
  {
    name: "Success",
    type: "column",
    fill: green[300],
    data: [
      {
        x: "02-10-2017 GMT",
        y: 34,
      },
      {
        x: "02-11-2017 GMT",
        y: 43,
      },
      {
        x: "02-12-2017 GMT",
        y: 31,
      },
      {
        x: "02-13-2017 GMT",
        y: 43,
      },
      {
        x: "02-14-2017 GMT",
        y: 33,
      },
      {
        x: "02-15-2017 GMT",
        y: 52,
      },
    ],
  },
  {
    name: "Failure",
    type: "column",
    fill: red[300],
    data: [
      {
        x: "02-10-2017 GMT",
        y: 34,
      },
      {
        x: "02-11-2017 GMT",
        y: 43,
      },
      {
        x: "02-12-2017 GMT",
        y: 31,
      },
      {
        x: "02-13-2017 GMT",
        y: 43,
      },
      {
        x: "02-14-2017 GMT",
        y: 33,
      },
      {
        x: "02-15-2017 GMT",
        y: 52,
      },
    ],
  },
  {
    name: "Upcoming",
    type: "column",
    fill: blue[300],
    data: [
      {
        x: "02-10-2017 GMT",
        y: 34,
      },
      {
        x: "02-11-2017 GMT",
        y: 43,
      },
      {
        x: "02-12-2017 GMT",
        y: 31,
      },
      {
        x: "02-13-2017 GMT",
        y: 43,
      },
      {
        x: "02-14-2017 GMT",
        y: 33,
      },
      {
        x: "02-15-2017 GMT",
        y: 52,
      },
    ],
  },
  {
    name: "Total",
    type: "line",
    fill: grey[300],
    data: [
      {
        x: "02-10-2017 GMT",
        y: 34,
      },
      {
        x: "02-11-2017 GMT",
        y: 43,
      },
      {
        x: "02-12-2017 GMT",
        y: 31,
      },
      {
        x: "02-13-2017 GMT",
        y: 43,
      },
      {
        x: "02-14-2017 GMT",
        y: 33,
      },
      {
        x: "02-15-2017 GMT",
        y: 52,
      },
    ],
  },
];

export default function BarLineAnalytics(props: IProps) {

  return (
    <Card>
      <CardHeader title={props.title} subheader={props.subtitle} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Range</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            data-testid="button"
            value={10}
            label="Range"
            /*onChange={handleChange}*/
          >
            <MenuItem value={10}>Last 7 days</MenuItem>
            <MenuItem value={20}>Last 30 days</MenuItem>
            <MenuItem value={30}>Last 90 days</MenuItem>
          </Select>
        </FormControl>
        <ReactApexChart
          type="line"
          series={fakeData}
          height={350}
          options={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
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
            stroke: {
              curve: "smooth",
              width: 2,
            },
          }}
        />
      </Box>
    </Card>
  );
}
