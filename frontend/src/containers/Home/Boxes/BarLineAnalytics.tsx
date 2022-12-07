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
import { useState, useEffect } from "react";
import axios from "axios";

interface IProps {
  title: string;
  subtitle: string;
}

interface ChartDataType {
  name: string;
  type: string;
  fill: string;
  data: { x: string; y: number }[];
}

const initialDailyData: { x: string; y: number }[] = [
  { x: "2022-11-23", y: 0 },
  { x: "2022-11-24", y: 0 },
  { x: "2022-11-25", y: 0 },
  { x: "2022-11-26", y: 0 },
  { x: "2022-11-27", y: 0 },
  { x: "2022-11-28", y: 0 },
  { x: "2022-11-29", y: 0 },
  { x: "2022-11-30", y: 0 },
  { x: "2022-12-01", y: 0 },
  { x: "2022-12-02", y: 0 },
  { x: "2022-12-03", y: 0 },
  { x: "2022-12-04", y: 0 },
  { x: "2022-12-05", y: 0 },
  { x: "2022-12-06", y: 0 },
  { x: "2022-12-07", y: 0 },
];

const initialWeeklyData: { x: string; y: number }[] = [
  { x: "2022 Nov Week 1", y: 0 },
  { x: "2022 Nov Week 2", y: 0 },
  { x: "2022 Nov Week 3", y: 0 },
  { x: "2022 Nov Week 4", y: 0 },
  { x: "2022 Nov Week 5", y: 0 },
  { x: "2022 Dec Week 1", y: 0 },
];

const initialMonthlyData: { x: string; y: number }[] = [
  { x: "2021 Dec", y: 0 },
  { x: "2022 Jan", y: 0 },
  { x: "2022 Feb", y: 0 },
  { x: "2022 Mar", y: 0 },
  { x: "2022 Apr", y: 0 },
  { x: "2022 May", y: 0 },
  { x: "2022 Jun", y: 0 },
  { x: "2022 Jul", y: 0 },
  { x: "2022 Aug", y: 0 },
  { x: "2022 Sep", y: 0 },
  { x: "2022 Oct", y: 0 },
  { x: "2022 Nov", y: 0 },
  { x: "2022 Dec", y: 0 },
];

export default function BarLineAnalytics(props: IProps) {
  const [type, setType] = useState<number>(10);
  const [success, setSuccess] =
    useState<{ x: string; y: number }[]>(initialDailyData);
  const [failure, setFailure] =
    useState<{ x: string; y: number }[]>(initialDailyData);
  const [upcoming, setUpcoming] =
    useState<{ x: string; y: number }[]>(initialDailyData);
  const [total, setTotal] =
    useState<{ x: string; y: number }[]>(initialDailyData);

  const getStartDay_Daily = () => {
    const time = new Date();
    let formattedDate = `${time.getFullYear()}-${time.getMonth() + 1}-${
      time.getDate() - 14
    }`;

    return formattedDate;
  };

  const getStartDay_Weekly = () => {
    const time = new Date();
    let formattedDate = `${time.getFullYear()}-${
      time.getMonth() - 2
    }-${time.getDate()}`;
    return formattedDate;
  };

  const getStartDay_Monthly = () => {
    const time = new Date();
    let formattedDate = `${time.getFullYear() - 1}-${
      time.getMonth() + 1
    }-${time.getDate()}`;
    return formattedDate;
  };

  const getToday = () => {
    const time = new Date();
    let formattedDate = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()}`;

    return formattedDate;
  };

  const getData = async () => {
    if (type === 10) {
      // Daily
      try {
        await axios
          .get("/api/notification/metrics/", {
            params: {
              start: getStartDay_Daily(),
              end: getToday(),
              interval: "day",
            },
          })
          .then((response) => {
            if (response.data.length === 0) {
              setSuccess(initialDailyData);
              setFailure(initialDailyData);
              setUpcoming(initialDailyData);
              setTotal(initialDailyData);
              return;
            } else {
              let successData = [];
              let failureData = [];
              let upcomingData = [];

              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status === "SUCCESS") {
                  successData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                } else if (response.data[i].status === "FAILURE") {
                  failureData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                } else {
                  upcomingData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                }
              }
              setSuccess(successData);
              setFailure(failureData);
              setUpcoming(upcomingData);
            }
          });
      } catch (error) {
        setSuccess(initialDailyData);
        setFailure(initialDailyData);
        setUpcoming(initialDailyData);
        setTotal(initialDailyData);
        console.log(error);
      }
    } else if (type === 20) {
      // Weekly
      try {
        await axios
          .get("/api/notification/metrics/", {
            params: {
              start: getStartDay_Weekly(),
              end: getToday(),
              interval: "week",
            },
          })
          .then((response) => {
            if (response.data.length === 0) {
              setSuccess(initialWeeklyData);
              setFailure(initialWeeklyData);
              setUpcoming(initialWeeklyData);
              setTotal(initialWeeklyData);
              return;
            } else {
              let successData = [];
              let failureData = [];
              let upcomingData = [];

              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status === "SUCCESS") {
                  successData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                } else if (response.data[i].status === "FAILURE") {
                  failureData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                } else {
                  upcomingData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                }
              }
              setSuccess(successData);
              setFailure(failureData);
              setUpcoming(upcomingData);
            }
          });
      } catch (error) {
        setSuccess(initialWeeklyData);
        setFailure(initialWeeklyData);
        setUpcoming(initialWeeklyData);
        setTotal(initialWeeklyData);
        console.log(error);
      }
    } else {
      try {
        await axios
          .get("/api/notification/metrics/", {
            params: {
              start: getStartDay_Monthly(),
              end: getToday(),
              interval: "month",
            },
          })
          .then((response) => {
            if (response.data.length === 0) {
              setSuccess(initialMonthlyData);
              setFailure(initialMonthlyData);
              setUpcoming(initialMonthlyData);
              setTotal(initialMonthlyData);
              return;
            } else {
              let successData = [];
              let failureData = [];
              let upcomingData = [];

              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status === "SUCCESS") {
                  successData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                } else if (response.data[i].status === "FAILURE") {
                  failureData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                } else {
                  upcomingData.push({
                    x: response.data[i].time,
                    y: response.data[i].count,
                  });
                }
              }
              setSuccess(successData);
              setFailure(failureData);
              setUpcoming(upcomingData);
            }
          });
      } catch (error) {
        setSuccess(initialMonthlyData);
        setFailure(initialMonthlyData);
        setUpcoming(initialMonthlyData);
        setTotal(initialMonthlyData);
        console.log(error);
      }
    }
  };

  const data: ChartDataType[] = [
    {
      name: "Success",
      type: "column",
      fill: green[300],
      data: success,
    },
    {
      name: "Failure",
      type: "column",
      fill: red[300],
      data: failure,
    },
    {
      name: "Upcoming",
      type: "column",
      fill: blue[300],
      data: upcoming,
    },
    {
      name: "Total",
      type: "line",
      fill: grey[300],
      data: total,
    },
  ];

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <Card>
      <CardHeader title={props.title} subheader={props.subtitle} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            data-testid="button"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value as number)}
          >
            <MenuItem value={10}>Daily</MenuItem>
            <MenuItem value={20}>Weekly</MenuItem>
            <MenuItem value={30}>Monthly</MenuItem>
          </Select>
        </FormControl>
        <ReactApexChart
          type="line"
          series={data}
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
