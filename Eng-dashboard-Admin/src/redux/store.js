import { configureStore } from "@reduxjs/toolkit";
import caseSlice from "./features/caseSlice";

export const store = configureStore({
    reducer: {
        case: caseSlice,
    }
})