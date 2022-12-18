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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { green, red, blue, grey } from "@mui/material/colors";

import { AppDispatch } from "../../../store";
import {
  analyticsSelector,
  getDailyData,
  getWeeklyData,
  getMonthlyData,
  getDailyDataByProject,
  getDailyDataByType,
  getWeeklyDataByProject,
  getWeeklyDataByType,
  getMonthlyDataByProject,
  getMonthlyDataByType,
} from "../../../store/slices/analytics";
import moment from "moment";
import { projectSelect } from "../../../store/slices/project";

interface IProps {
  title: string;
  subtitle: string;
  type: number;
  noti_type: string;
}

interface ChartDataType {
  name: string;
  type: string;
  fill: { colors: string };
  data: { x: string; y: number }[];
}

export default function BarLineAnalytics(props: IProps) {
  const [type, setType] = useState<number>(10);
  const dispatch = useDispatch<AppDispatch>();
  const analyticsData = useSelector(analyticsSelector);
  const [data, setData] = useState<ChartDataType[]>([]);
  const projectState = useSelector(projectSelect).selectedProject;

  useEffect(() => {
    const handleTypeChange = async () => {
      if (type === 10) {
        if (props.type === 0) {
          await dispatch(getDailyData());
        } else if (props.type === 1) {
          if (projectState) {
            await dispatch(getDailyDataByProject(projectState.id));
          }
        } else {
          await dispatch(getDailyDataByType(props.noti_type));
        }
      } else if (type === 20) {
        if (props.type === 0) {
          await dispatch(getWeeklyData());
        } else if (props.type === 1) {
          if (projectState) {
            await dispatch(getWeeklyDataByProject(projectState.id));
          }
        } else {
          await dispatch(getWeeklyDataByType(props.noti_type));
        }
      } else {
        if (props.type === 0) {
          await dispatch(getMonthlyData());
        } else if (props.type === 1) {
          if (projectState) {
            await dispatch(getMonthlyDataByProject(projectState.id));
          }
        } else {
          await dispatch(getMonthlyDataByType(props.noti_type));
        }
      }
    };
    handleTypeChange();
  }, [type, projectState, props.type]);
  useEffect(() => {
    function getData() {
      let success = [];
      let fail = [];
      let pending = [];
      let total = [];

      if (type === 10) {
        for (let i = 14; i >= 0; i--) {
          const date = moment().subtract(i, "days").format("YYYY-MM-DD");
          success.push({
            x: date,
            y: analyticsData.barLineDataDaily.Success[date],
          });
          fail.push({
            x: date,
            y: analyticsData.barLineDataDaily.Failure[date],
          });
          pending.push({
            x: date,
            y: analyticsData.barLineDataDaily.Pending[date],
          });
          total.push({
            x: date,
            y: analyticsData.barLineDataDaily.Total[date],
          });
        }
      } else if (type === 20) {
        for (let i = 15; i >= 0; i--) {
          const today = moment();
          const date = moment()
            .subtract(i, "weeks")
            .subtract(today.weekday() - 1, "days")
            .format("YYYY-MM-DD");
          success.push({
            x: date,
            y: analyticsData.barLineDataWeekly.Success[date],
          });
          fail.push({
            x: date,
            y: analyticsData.barLineDataWeekly.Failure[date],
          });
          pending.push({
            x: date,
            y: analyticsData.barLineDataWeekly.Pending[date],
          });
          total.push({
            x: date,
            y: analyticsData.barLineDataWeekly.Total[date],
          });
        }
      } else {
        for (let i = 12; i >= 0; i--) {
          const date = moment().subtract(i, "months").format("YYYY-MM-01");
          success.push({
            x: date,
            y: analyticsData.barLineDataMonthly.Success[date],
          });
          fail.push({
            x: date,
            y: analyticsData.barLineDataMonthly.Failure[date],
          });
          pending.push({
            x: date,
            y: analyticsData.barLineDataMonthly.Pending[date],
          });
          total.push({
            x: date,
            y: analyticsData.barLineDataMonthly.Total[date],
          });
        }
      }

      const data = [
        {
          name: "Success",
          type: "column",
          fill: {colors: green[300]},
          data: success,
        },
        {
          name: "Failure",
          type: "column",
          fill: {colors: red[300]},
          data: fail,
        },
        {
          name: "Pending",
          type: "column",
          fill: {colors: blue[300]},
          data: pending,
        },
        {
          name: "Total",
          type: "line",
          fill: {colors: grey[300]},
          data: total,
        },
      ];

      setData(data);
    }
    getData();
  }, [analyticsData]);

  return (
    <Card>
      <CardHeader title={props.title} subheader={props.subtitle} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            inputProps={{ "data-testid": "button" }}
            value={type}
            label="Type"
            onChange={(e) => {
              setType(e.target.value as number);
            }}
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
            chart: {
              stacked: true,
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true,
                  customIcons: [],
                },
              },
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
            fill: {
              colors: [green[300], red[300], blue[300], grey[300]],
            },
            dataLabels: {
              style: {
                colors: [green[300], red[300], blue[300], grey[300]],
              }
            },
            markers: {
              colors: [green[300], red[300], blue[300], grey[300]],
            },
          }}
          fill={[green[300], red[300], blue[300], grey[300]]}
        />
      </Box>
    </Card>
  );
}
