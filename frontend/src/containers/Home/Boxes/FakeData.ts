import { green, red,  } from '@material-ui/core/colors';

interface ChartDataType {
  name: string;
  type: string;
  fill: string;
  data: { x: string; y: number }[];
}

export const slackSeries: ChartDataType[] = [
  {
    name: "Success",
    type: "column",
    fill: green[300],
    data: [
      {
        x: "00h",
        y: 1,
      },
      {
        x: "01h",
        y: 1,
      },
      {
        x: "02h",
        y: 0,
      },
      {
        x: "03h",
        y: 0,
      },
      {
        x: "04h",
        y: 0,
      },
      {
        x: "05h",
        y: 0,
      },
      {
        x: "06h",
        y: 0,
      },
      {
        x: "07h",
        y: 0,
      },
      {
        x: "08h",
        y: 8,
      },
      {
        x: "09h",
        y: 17,
      },
      {
        x: "10h",
        y: 21,
      },
      {
        x: "11h",
        y: 22,
      },
      {
        x: "12h",
        y: 21,
      },
      {
        x: "13h",
        y: 21,
      },
      {
        x: "14h",
        y: 15,
      },
      {
        x: "15h",
        y: 12,
      },
      {
        x: "16h",
        y: 24,
      },
      {
        x: "17h",
        y: 31,
      },
      {
        x: "18h",
        y: 52,
      },
      {
        x: "19h",
        y: 19,
      },
      {
        x: "20h",
        y: 11,
      },
      {
        x: "21h",
        y: 5,
      },
      {
        x: "22h",
        y: 2,
      },
      {
        x: "23h",
        y: 1,
      },
    ],
  },
  {
    name: "Failure",
    type: "column",
    fill: red[300],
    data: [
      {
        x: "00h",
        y: 0,
      },
      {
        x: "01h",
        y: 0,
      },
      {
        x: "02h",
        y: 0,
      },
      {
        x: "03h",
        y: 0,
      },
      {
        x: "04h",
        y: 0,
      },
      {
        x: "05h",
        y: 0,
      },
      {
        x: "06h",
        y: 0,
      },
      {
        x: "07h",
        y: 0,
      },
      {
        x: "08h",
        y: 1,
      },
      {
        x: "09h",
        y: 1,
      },
      {
        x: "10h",
        y: 3,
      },
      {
        x: "11h",
        y: 2,
      },
      {
        x: "12h",
        y: 4,
      },
      {
        x: "13h",
        y: 7,
      },
      {
        x: "14h",
        y: 5,
      },
      {
        x: "15h",
        y: 2,
      },
      {
        x: "16h",
        y: 5,
      },
      {
        x: "17h",
        y: 7,
      },
      {
        x: "18h",
        y: 3,
      },
      {
        x: "19h",
        y: 1,
      },
      {
        x: "20h",
        y: 1,
      },
      {
        x: "21h",
        y: 0,
      },
      {
        x: "22h",
        y: 0,
      },
      {
        x: "23h",
        y: 0,
      },
    ],
  },
  {
    name: "Upcoming",
    type: "column",
    fill: "none",
    data: [
        {
            x: "00h",
            y: 0
        },
        {
            x: "01h",
            y: 0
        },
        {
            x: "02h",
            y: 0
        },
        {
            x: "03h",
            y: 0
        },
        {
            x: "04h",
            y: 0
        },
        {
            x: "05h",
            y: 0
        },
        {
            x: "06h",
            y: 0
        },
        {
            x: "07h",
            y: 0
        },
        {
            x: "08h",
            y: 0
        },
        {
            x: "09h",
            y: 0
        },
        {
            x: "10h",
            y: 0
        },
        {
            x: "11h",
            y: 0
        },
        {
            x: "12h",
            y: 0
        },
        {
            x: "13h",
            y: 0
        },
        {
            x: "14h",
            y: 0
        },
        {
            x: "15h",
            y: 0
        },
        {
            x: "16h",
            y: 0
        },
        {
            x: "17h",
            y: 0
        },
        {
            x: "18h",
            y: 0
        },
        {
            x: "19h",
            y: 0
        },
        {
            x: "20h",
            y: 0
        },
        {
            x: "21h",
            y: 0
        },
        {
            x: "22h",
            y: 0
        },
        {
            x: "23h",
            y: 0
        }
    ]
  },
  {
    name: "Total",
    type: "line",
    fill: "none",
    data: [
        {
            x: "00h",
            y: 1
        },
        {
            x: "01h",
            y: 1
        },
        {
            x: "02h",
            y: 0
        },
        {
            x: "03h",
            y: 0
        },
        {
            x: "04h",
            y: 0
        },
        {
            x: "05h",
            y: 0
        },
        {
            x: "06h",
            y: 0
        },
        {
            x: "07h",
            y: 0
        },
        {
            x: "08h",
            y: 9
        },
        {
            x: "09h",
            y: 18
        },
        {
            x: "10h",
            y: 24
        },
        {
            x: "11h",
            y: 24
        },
        {
            x: "12h",
            y: 25
        },
        {
            x: "13h",
            y: 28
        },
        {
            x: "14h",
            y: 33
        },
        {
            x: "15h",
            y: 35
        },
        {
            x: "16h",
            y: 39
        },
        {
            x: "17h",
            y: 46
        },
        {
            x: "18h",
            y: 48
        },
        {
            x: "19h",
            y: 49
        },
        {
            x: "20h",
            y: 50
        },
        {
            x: "21h",
            y: 50
        },
        {
            x: "22h",
            y: 50
        },
        {
            x: "23h",
            y: 50
        }   
    ]

  }

];
