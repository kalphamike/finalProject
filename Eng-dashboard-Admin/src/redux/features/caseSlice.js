import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    listOfCases: [],
    numberOfAllCases: 0,
    casesInProvice: [],
    numberOfcasesInProvice: 0,
    casesInDistrict: [],
    numebrOfCasesInDistrict: 0,
    casesInSector: 0,
    victimes: [],
    numberOfVictimes: 0,
    suspects: [],
    numberOfSuspects: 0,
    girls: [],
    numberOfGirls: 0,
    boys: [],
    numberOfBoys: 0,
    disabledChildren: [],
    numberOfDisabledChildren: 0,
    selectedCategory: '',
    period: '',
    periodType: '',
    isLoading: false
}

export const getAllCases = createAsyncThunk(
    'case/getAllCases',
    async (filter, thunkAPI) => {
        const { category, locationType, location, period } = filter;
        try {
            const response = await axios.get(`http://localhost:5000/api/case/list`);
            response.data.forEach(element => {
                element.id = element._id,
                delete element._id;x
                delete element._v;
            });
            response.data.sort((a,b) => new Date(b.ReportDate) - new Date(a.ReportDate));
            return { 
                data: response.data,  
                category: category,
                locationType: locationType,
                location: location,
                period: period
            };
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!');
        }
    }
);

const caseSlice = createSlice({
    name: 'case',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getAllCases.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllCases.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.listOfCases = action.payload;
            state.numberOfAllCases = action.payload.length;
        },
        [getAllCases.rejected]: (state) => {
            state.isLoading = false;
        },
    }
})

export const {} = caseSlice.actions;
export default caseSlice.reducer;