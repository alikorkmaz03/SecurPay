import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync=createAsyncThunk<Product[]>(
    'catalog/fetchProductAsync',
    async ()=>{
        try {
            
            return await agent.Catalog.list();
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchOnlyProductAsync=createAsyncThunk<Product,number>(
    'catalog/fetchOnlyProductAsync',
    async (productId,thunkAPI)=>{
        try {
            
            return await agent.Catalog.details(productId);
        } catch (error :any) {
          return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const catalogSlice =createSlice({
    name:'catalog',
    initialState:productAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{},
    extraReducers:(builder=>{

        //All Products Catalog Page
        builder.addCase(fetchProductsAsync.pending,(state=>{
            state.status='pendingFetchProducts';
        }));
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsync.rejected,(state)=>{
            state.status='idle';
        });

        //Only Product Details
        builder.addCase(fetchOnlyProductAsync.pending,(state=>{
            state.status='pendingFetchProduct'
        }));
        builder.addCase(fetchOnlyProductAsync.fulfilled,(state,action)=>{
            productAdapter.upsertOne(state,action.payload);
            state.status='idle';
        });
        builder.addCase(fetchOnlyProductAsync.rejected,(state,action)=>{
            console.log(action);
            state.status='idle';
        });
    })
})

export const productSelectors=productAdapter.getSelectors((state:RootState)=>state.catalog);