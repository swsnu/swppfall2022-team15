import { alpha } from "@material-ui/core/styles";
import { Box, Card, Icon, Typography, useTheme } from "@mui/material";

import Iconify from "../../components/iconify/Iconify";
import "./Widget.css";

interface IProps {
  icon: any;
  title: string;
  subtitle: string | null;
  value: number;
  color_main: string;
  color_dark: string;
  color_light: string;
  color_darker: string;
  color_lighter: string;
}

export default function Widget(props: IProps) {
  function shortenNumber(value: number) {
    if (props.value > 1000000) {
      return (props.value / 1000000).toFixed(1) + "M";
    } else if (props.value > 1000) {
      return (props.value / 1000).toFixed(1) + "K";
    } else {
      return props.value;
    }
  }

  return (
    <Card
      className="widget"
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        backgroundColor: props.color_lighter,
        color: props.color_darker,
      }}
    >
      <Icon
        className="icon"
        sx={{
          height: (theme) => theme.spacing(8),
          width: (theme) => theme.spacing(8),
          color: props.color_darker,
          backgroundImage: `linear-gradient(135deg, ${alpha(
            props.color_dark,
            0
          )} 0%, ${alpha(props.color_dark, 0.88)} 100%)`,
        }}
      >
        <Iconify icon={props.icon} width={24} height={24} />
      </Icon>

      <Box className="box">
        <Typography variant="h3">{shortenNumber(props.value)}</Typography>
        <Typography variant="h3">{props.title}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {props.subtitle}
        </Typography>
      </Box>
    </Card>
  );
}
