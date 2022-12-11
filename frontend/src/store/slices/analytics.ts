import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";
import { RootState } from "..";

interface DataHash {
  [date: string]: number;
}

export type AnalyticsStatus = {
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
    //TODO: fix this to YYYY-MM-(firstdayofweek)
    const today = moment();
    const date = moment()
      .subtract(i, "weeks")
      .subtract(today.weekday() - 1, "days")
      .format("YYYY-MM-DD");
    weeklyData[date] = 0;
  }

  return weeklyData;
}

function initializeMonthlyData() {
  const monthlyData: DataHash = {};
  for (let i = 12; i >= 0; i--) {
    const date = moment().subtract(i, "months").format("YYYY-MM-01");
    monthlyData[date] = 0;
  }

  return monthlyData;
}

export const getDailyData = createAsyncThunk(
  "analytics/getDailyData",
  async () => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(14, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "day",
      },
    });
    return response.data;
  }
);

export const getWeeklyData = createAsyncThunk(
  "analytics/getWeeklyData",
  async () => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(15, "weeks").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "week",
      },
    });
    return response.data;
  }
);

export const getMonthlyData = createAsyncThunk(
  "analytics/getMonthlyData",
  async () => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(12, "months").format("YYYY-MM-01"),
        end: moment().format("YYYY-MM-DD"),
        interval: "month",
      },
    });
    return response.data;
  }
);

export const getDailyDataByProject = createAsyncThunk(
  "analytics/getDailyDataByProject",
  async (projectId: number) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(14, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "day",
        projectId: projectId,
      },
    });
    return response.data;
  }
);

export const getWeeklyDataByProject = createAsyncThunk(
  "analytics/getWeeklyDataByProject",
  async (projectId: number) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(15, "weeks").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "week",
        projectId: projectId,
      },
    });
    return response.data;
  }
);

export const getMonthlyDataByProject = createAsyncThunk(
  "analytics/getMonthlyDataByProject",
  async (projectId: number) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(12, "months").format("YYYY-MM-01"),
        end: moment().format("YYYY-MM-DD"),
        interval: "month",
        projectId: projectId,
      },
    });
    return response.data;
  }
);

export const getDailyDataByType = createAsyncThunk(
  "analytics/getDailyDataByType",
  async (type: string) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(14, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "day",
        type: type,
      },
    });
    return response.data;
  }
);

export const getWeeklyDataByType = createAsyncThunk(
  "analytics/getWeeklyDataByType",
  async (type: string) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(15, "weeks").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        interval: "week",
        type: type,
      },
    });
    console.log(response.data)
    return response.data;
  }
);

export const getMonthlyDataByType = createAsyncThunk(
  "analytics/getMonthlyDataByType",
  async (type: string) => {
    const response = await axios.get("/api/notification/metrics/", {
      params: {
        start: moment().subtract(12, "months").format("YYYY-MM-01"),
        end: moment().format("YYYY-MM-DD"),
        interval: "month",
        type: type,
      },
    });
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
      state.barLineData.Success = initializeDailyData();
      state.barLineData.Failure = initializeDailyData();
      state.barLineData.Pending = initializeDailyData();
      state.barLineData.Total = initializeDailyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "daily";
    });
    builder.addCase(getDailyDataByProject.fulfilled, (state, action) => {
      state.barLineData.Success = initializeDailyData();
      state.barLineData.Failure = initializeDailyData();
      state.barLineData.Pending = initializeDailyData();
      state.barLineData.Total = initializeDailyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "daily";
    });
    builder.addCase(getDailyDataByType.fulfilled, (state, action) => {
      state.barLineData.Success = initializeDailyData();
      state.barLineData.Failure = initializeDailyData();
      state.barLineData.Pending = initializeDailyData();
      state.barLineData.Total = initializeDailyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "daily";
    });
    builder.addCase(getWeeklyData.fulfilled, (state, action) => {
      state.barLineData.Success = initializeWeeklyData();
      state.barLineData.Failure = initializeWeeklyData();
      state.barLineData.Pending = initializeWeeklyData();
      state.barLineData.Total = initializeWeeklyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "weekly";
    });
    builder.addCase(getWeeklyDataByProject.fulfilled, (state, action) => {
      state.barLineData.Success = initializeWeeklyData();
      state.barLineData.Failure = initializeWeeklyData();
      state.barLineData.Pending = initializeWeeklyData();
      state.barLineData.Total = initializeWeeklyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "weekly";
    });
    builder.addCase(getWeeklyDataByType.fulfilled, (state, action) => {
      state.barLineData.Success = initializeWeeklyData();
      state.barLineData.Failure = initializeWeeklyData();
      state.barLineData.Pending = initializeWeeklyData();
      state.barLineData.Total = initializeWeeklyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "weekly";
    });
    builder.addCase(getMonthlyData.fulfilled, (state, action) => {
      state.barLineData.Success = initializeMonthlyData();
      state.barLineData.Failure = initializeMonthlyData();
      state.barLineData.Pending = initializeMonthlyData();
      state.barLineData.Total = initializeMonthlyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "monthly";
    });
    builder.addCase(getMonthlyDataByProject.fulfilled, (state, action) => {
      state.barLineData.Success = initializeMonthlyData();
      state.barLineData.Failure = initializeMonthlyData();
      state.barLineData.Pending = initializeMonthlyData();
      state.barLineData.Total = initializeMonthlyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "monthly";
    });
    builder.addCase(getMonthlyDataByType.fulfilled, (state, action) => {
      state.barLineData.Success = initializeMonthlyData();
      state.barLineData.Failure = initializeMonthlyData();
      state.barLineData.Pending = initializeMonthlyData();
      state.barLineData.Total = initializeMonthlyData();
      for (let i = 0; i < action.payload.length; i++) {
        const data = action.payload[i];
        const time = action.payload[i].time.split(" ")[0];
        if (data.status === "SUCCESS") {
          state.barLineData.Success[time] += data.count;
        } else if (data.status === "FAILURE") {
          state.barLineData.Failure[time] += data.count;
        } else {
          state.barLineData.Pending[time] += data.count;
        }
        state.barLineData.Total[time] += data.count;
      }
      state.barlineType = "monthly";
    });
  },
});

export const analyticsSelector = (state: RootState) => state.analytics;
export default AnalyticsSlice.reducer;
