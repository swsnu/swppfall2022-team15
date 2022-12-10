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
} from "../../../store/slices/analytics";
import moment from "moment";
import { projectSelect } from "../../../store/slices/project";

interface IProps {
  title: string;
  subtitle: string;
  type: number;
}

interface ChartDataType {
  name: string;
  type: string;
  fill: string;
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
        if(props.type === 0) {
          await dispatch(getDailyData());
        }
        else if (props.type === 1) {
          if(projectState) {
            await dispatch(getDailyDataByProject(projectState.id));
          }
        }
        
      } else if (type === 20) {
        await dispatch(getWeeklyData());
      } else {
        await dispatch(getMonthlyData());
      }
    };
    handleTypeChange();
  }, [type, dispatch]);
  useEffect(() => {
    function getData() {
      let success = [];
      let fail = [];
      let pending = [];
      let total = [];

      if (analyticsData.barlineType === "daily") {
        for (let i = 14; i >= 0; i--) {
          const date = moment().subtract(i, "days").format("YYYY-MM-DD");
          success.push({ x: date, y: analyticsData.barLineData.Success[date] });
          fail.push({ x: date, y: analyticsData.barLineData.Failure[date] });
          pending.push({ x: date, y: analyticsData.barLineData.Pending[date] });
          total.push({ x: date, y: analyticsData.barLineData.Total[date] });
        }
      } else if (analyticsData.barlineType === "weekly") {
        for (let i = 15; i >= 0; i--) {
          const today = moment();
          const date = moment().subtract(i, "weeks").subtract(today.weekday()-1, "days").format("YYYY-MM-DD");
          success.push({ x: date, y: analyticsData.barLineData.Success[date] });
          fail.push({ x: date, y: analyticsData.barLineData.Failure[date] });
          pending.push({ x: date, y: analyticsData.barLineData.Pending[date] });
          total.push({ x: date, y: analyticsData.barLineData.Total[date] });
        }
      } else {
        for (let i = 12; i >= 0; i--) {
          const date = moment().subtract(i, "months").format("YYYY-MM-01");
          success.push({ x: date, y: analyticsData.barLineData.Success[date] });
          fail.push({ x: date, y: analyticsData.barLineData.Failure[date] });
          pending.push({ x: date, y: analyticsData.barLineData.Pending[date] });
          total.push({ x: date, y: analyticsData.barLineData.Total[date] });
        }
      }

      const data = [
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
          data: fail,
        },
        {
          name: "Pending",
          type: "column",
          fill: blue[300],
          data: pending,
        },
        {
          name: "Total",
          type: "line",
          fill: grey[300],
          data: total,
        },
      ];

      setData(data);
    }
    getData();
  }, [analyticsData])

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
