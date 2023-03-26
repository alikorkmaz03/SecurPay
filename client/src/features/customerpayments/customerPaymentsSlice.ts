import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { CustomerPaymentsParams, Order } from "../../app/models/order";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";

interface CustomerPaymentsState {
    customerPaymentsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    buyerId: string[];
    customerPaymentsParams: CustomerPaymentsParams;
    metaData: MetaData | null;

}

const customerPaymentsAdapter = createEntityAdapter<Order>();

function getAxiosParams(customerPaymentsParams: CustomerPaymentsParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', customerPaymentsParams.pageNumber.toString());
    params.append('pageSize',   customerPaymentsParams.pageSize.toString());
    params.append('orderBy',    customerPaymentsParams.orderBy);
    
    if(customerPaymentsParams.startDate && customerPaymentsParams.endDate)
    { 
      params.append('startDate',  customerPaymentsParams.startDate);
      params.append('endDate',    customerPaymentsParams.endDate);
    }
    if (customerPaymentsParams.searchTerm) params.append('searchTerm', customerPaymentsParams.searchTerm);
    console.log('URLSearchParams:', params.toString()); // Bu satırı ekleyin
    return params;
}

export const fetchCustomerPaymentsAsync = createAsyncThunk<Order[], void, {state:RootState}>(
    'customerpayments/fetchCustomerPaymentsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().customerpayments.customerPaymentsParams);
        try {
                
            const response = await agent.CustomerPayments.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


// export const fetchFilters = createAsyncThunk(
//     'payments/filters',
//     async (_, thunkAPI) => {
//         try {
//             return agent.CustomerPayments.fetchFilters();

//         } catch (error: any) {
//             return thunkAPI.rejectWithValue({ error: error.data });
//         }
//     }
// )

export const fetchRangePaymentsAsync = createAsyncThunk<Order[], void, { state: RootState }>(
    'customerpayments/fetchRangePaymentsAsync',
    async (_, thunkAPI) => {
      const { customerPaymentsParams } = thunkAPI.getState().customerpayments;
      const params = getAxiosParams(customerPaymentsParams);
      try {
        const response = await agent.CustomerPayments.list(params);
        console.log('Response:', response);
        thunkAPI.dispatch(setMetaData(response.metaData));        
       
        return response.items;
      } catch (error: any) {
        console.log("Error in fetchRangePaymentsAsync:", error);
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
)


function initParams() {
     
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        buyerId: [],
        startDate:'',
        endDate:''  
        
    }
}

export const customerPaymentsSlice = createSlice({
    name: 'customerpayments',
    initialState: customerPaymentsAdapter.getInitialState<CustomerPaymentsState>({
        customerPaymentsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        buyerId: [],
        customerPaymentsParams: initParams(),
        metaData:null
    }),
    reducers: {
        setCustomerPaymentsParams: (state, action) => {
            state.customerPaymentsLoaded = false;
            state.customerPaymentsParams = { ...state.customerPaymentsParams, ...action.payload, pageNumber:1 };
        },
        setPageNumber: (state, action) => {
            state.customerPaymentsLoaded = false;
            state.customerPaymentsParams = { ...state.customerPaymentsParams, ...action.payload};
        },
        
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetCustomerPaymentsParams: (state) => {
            state.customerPaymentsParams = initParams();

        },
        setStartDate: (state, action ) => {
            state.customerPaymentsParams.startDate = action.payload;
            state.customerPaymentsParams = { ...state.customerPaymentsParams, ...action.payload};
          },
          setEndDate: (state, action ) => {
            state.customerPaymentsParams.endDate = action.payload;
            state.customerPaymentsParams = { ...state.customerPaymentsParams, ...action.payload};
        }
      
          
    },
    extraReducers: (builder => {
        //All CustomerPayments Page
           builder.addCase(fetchCustomerPaymentsAsync.pending, (state => {
            state.status = 'pendingFetchProducts';
        }));
        builder.addCase(fetchCustomerPaymentsAsync.fulfilled, (state, action) => {
            customerPaymentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.customerPaymentsLoaded = true;
        });
        builder.addCase(fetchCustomerPaymentsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });

        //Fetch Filters
        // builder.addCase(fetchFilters.pending,(state,action)=>{
        //     state.status = 'pendingFetchFilters'; 
        // });
        // builder.addCase(fetchFilters.fulfilled,(state,action)=> {             
        //     state.buyerId = action.payload.types;
        //     state.filtersLoaded = true;
        //     state.status = 'idle';
        // });
        // builder.addCase(fetchFilters.rejected, (state, action) => {
        //     state.status = 'idle';
        //     console.log(action.payload);
        // });

         // fetchRangePaymentsAsync Page
         builder.addCase(fetchRangePaymentsAsync.pending, (state => {
            state.status = 'pendingFetchPaymentRange';
        }));
        builder.addCase(fetchRangePaymentsAsync.fulfilled, (state, action) => {
            customerPaymentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.customerPaymentsLoaded = true;
        });
        builder.addCase(fetchRangePaymentsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
})

export const customerPaymentsSelectors = customerPaymentsAdapter.getSelectors((state: RootState) => state.customerpayments);

export const { setCustomerPaymentsParams, resetCustomerPaymentsParams,setMetaData,setPageNumber,setStartDate,setEndDate } = customerPaymentsSlice.actions;