import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;

}

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {

            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchOnlyProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchOnlyProductAsync',
    async (productId, thunkAPI) => {
        try {

            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();

        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 9,
        orderBy: 'name'
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams:initParams()
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },
        resetProductParams: (state) => {
            state.productParams = initParams();

        }
    },
    extraReducers: (builder => {

        //All Products Catalog Page
        builder.addCase(fetchProductsAsync.pending, (state => {
            state.status = 'pendingFetchProducts';
        }));
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });

        //Only Product Details
        builder.addCase(fetchOnlyProductAsync.pending, (state => {
            state.status = 'pendingFetchProduct'
        }));
        builder.addCase(fetchOnlyProductAsync.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchOnlyProductAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });

        //Fetch Filters
        builder.addCase(fetchFilters.pending,(state,action)=>{
            state.status = 'pendingFetchFilters'; 
        });
        builder.addCase(fetchFilters.fulfilled,(state,action)=> {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);

export const { setProductParams, resetProductParams } = catalogSlice.actions;