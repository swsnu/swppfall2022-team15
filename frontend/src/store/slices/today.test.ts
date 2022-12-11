import reducer, { getData, AnalyticsStatus, DataHash } from "./today";
import { configureStore, EnhancedStore, AnyAction } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";
import axios from "axios";

describe("todaySlice", () => {
    let store: EnhancedStore<
        {
        today: {
            data: AnalyticsStatus;
            successTotal: number;
            failureTotal: number;
            mostActive: {time: number, count: number}
        };
        },
        AnyAction,
        [
        ThunkMiddleware<
            {
            today: {
            data: AnalyticsStatus;
            successTotal: number;
            failureTotal: number;
            mostActive: {time: number, count: number}
        };
            },
            AnyAction,
            undefined
        >
        ]
    >;
    
    const fakeData: DataHash = {
        "00 hr": 0,
        "01 hr": 0,
        "02 hr": 0,
        "03 hr": 0,
        "04 hr": 0,
        "05 hr": 0,
        "06 hr": 0,
        "07 hr": 0,
        "08 hr": 0,
        "09 hr": 0,
        "10 hr": 0,
        "11 hr": 0,
        "12 hr": 0,
        "13 hr": 0,
        "14 hr": 0,
        "15 hr": 0,
        "16 hr": 0,
        "17 hr": 0,
        "18 hr": 0,
        "19 hr": 0,
        "20 hr": 0,
        "21 hr": 0,
        "22 hr": 0,
        "23 hr": 0,
    };
    
    beforeAll(() => {
        store = configureStore({ reducer: { today: reducer } });
    });
    
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
        data: {
        Success: {},
        Failure: {},
        Pending: {},
        Total: {},
    },
    successTotal: 0,
    failureTotal: 0,
    mostActive: {time: -1, count: 0},
        });
    });

});