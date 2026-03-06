import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:"",
        status: 'idle',
        error: null
    },
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        setStatus:(state,action)=>{
            state.status = action.payload;
        },
        setError:(state,action)=>{
            state.error = action.payload;
        }
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        }
    }
});
export const {setSingleCompany, setCompanies,setSearchCompanyByText,setStatus,setError} = companySlice.actions;
export default companySlice.reducer;