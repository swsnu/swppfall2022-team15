import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";
import { RootState } from "..";

interface DataHash {
  [date: string]: number;
}

type AnalyticsStatus = {
  Success: DataHash;
  Failure: DataHash;
  Pending: DataHash;
  Total: DataHash;
};

function initializeDailyData() {
  const dailyData: DataHash = {};
  for (let i = 14; i >= 0; i--) {
    const date = moment().subtract(i, "days").format("YYYY-MM-DD");
    dailyData[date] = 0;
  }

  return dailyData;
}

function initializeWeeklyData() {
  const weeklyData: DataHash = {};
  for (let i = 15; i >= 0; i--) {
    const date = moment().subtract(i, "weeks").format("YYYY-MM-DD");
    weeklyData[date] = 0;
  }

  return weeklyData;
}

function initializeMonthlyData() {
  const monthlyData: DataHash = {};
  for (let i = 12; i >= 0; i--) {
    const date = moment().subtract(i, "months").format("YYYY-MM-DD");
    monthlyData[date] = 0;
  }

  return monthlyData;
}

export const getDailyData = createAsyncThunk(
  "analytics/getDailyData",
  async () => {
    initializeDailyData();

    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start_date: moment().subtract(14, "days").format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
        interval: "day",
      },
    });
    console.log(response.data);
    return response.data;
  }
);

export const getWeeklyData = createAsyncThunk(
  "analytics/getWeeklyData",
  async () => {
    initializeWeeklyData();

    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start_date: moment().subtract(15, "weeks").format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
        interval: "week",
      },
    });
    console.log(response.data);
    return response.data;
  }
);

export const getMonthlyData = createAsyncThunk(
  "analytics/getMonthlyData",
  async () => {
    initializeMonthlyData();

    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start_date: moment().subtract(12, "months").format("YYYY-MM-DD"),
        end_date: moment().format("YYYY-MM-DD"),
        interval: "month",
      },
    });
    console.log(response.data);
    return response.data;
  }
);

const initialState: {
  barLineData: AnalyticsStatus;
  barlineType: string;
} = {
  barLineData: {
    Success: {},
    Failure: {},
    Pending: {},
    Total: {},
  },
  barlineType: "daily",
};

export const AnalyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDailyData.fulfilled, (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[data.time] = data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[data.time] = data.count;
        } else {
          state.barLineData.Pending[data.time] = data.count;
        }
        state.barLineData.Total[data.time] = data.count;
      }
      state.barlineType = "daily";
    });
    builder.addCase(getWeeklyData.fulfilled, (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[data.time] = data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[data.time] = data.count;
        } else {
          state.barLineData.Pending[data.time] = data.count;
        }
        state.barLineData.Total[data.time] = data.count;
      }
      state.barlineType = "weekly";
    });
    builder.addCase(getMonthlyData.fulfilled, (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[data.time] = data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[data.time] = data.count;
        } else {
          state.barLineData.Pending[data.time] = data.count;
        }
        state.barLineData.Total[data.time] = data.count;
      }
      state.barlineType = "monthly";
    });
  },
});

export const analyticsSelector = (state: RootState) => state.analytics;
export default AnalyticsSlice.reducer;
