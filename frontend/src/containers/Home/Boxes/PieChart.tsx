import { Card, CardHeader } from "@mui/material";
import ReactApexChart from "react-apexcharts";

interface IProps {
  title: string;
  subheader: string;
  series: number[];
  labels: string[];
  colors: string[];
}

export default function PieChart(props: IProps) {
  return (
    <Card>
      <CardHeader title={props.title} subheader={props.subheader} />

      <ReactApexChart
        type="pie"
        series={props.series}
        options={{
          labels: props.labels,
          colors: props.colors,
          legend: {
            show: true,
            position: "right",
            horizontalAlign: "center",
            fontSize: "18px",
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: "18px",
            },
          },
          responsive: [
            {
              breakpoint: 480,
            },
          ],
          plotOptions: {
            pie: {
              customScale: 0.8,
            },
          },
        }}
      />
    </Card>
  );
}
